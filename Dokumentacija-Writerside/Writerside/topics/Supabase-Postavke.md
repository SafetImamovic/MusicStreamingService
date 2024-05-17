# Supabase Postavke

## Kreiranje Računa

1. **Kreiranje Supabase računa putem GitHub-a**
   - Registracija na Supabase koristeći GitHub račun.

## Postavke Projekta

1. **Postavke projekta**
   - Naziv projekta: `MusicStreamingService`
   - Region: Frankfurt, EU (lokacija servera)

2. **Lozinka projekta**
   - Generisana je lozinka za projekat i kopirana je u `password.txt` u korijenu projekta.
   - Dodano je `password.txt` u `.gitignore` kako bi se osiguralo da se ne pošalje u repozitorij.

## API Ključevi

1. **Postavke API ključeva**
   - U postavkama Supabase -> API.
   - Prikupljeno je sljedeće:
      - `NEXT_PUBLIC_SUPABASE_URL`
      - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
      - `SUPABASE_SERVICE_ROLE_KEY`
   - Dodano je ovo u `.env.local` datoteku.
   - Osigurajte da je `.env.local` dodan u `.gitignore`.

> Napomena
> **Objašnjenje API ključeva:**
> - **NEXT_PUBLIC_SUPABASE_URL**: URL vaše Supabase instance.
> - **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Anonimni ključ za javni pristup.
> - **SUPABASE_SERVICE_ROLE_KEY**: Ključ sa povišenim ovlaštenjima za server-side operacije.

## Šema Baze Podataka

### Brzi Start Šabloni

1. **Stripe Pretplate Šablon**

```sql
-- TABELA USERS
create table users (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  billing_address jsonb,
  payment_method jsonb
);
alter table users enable row level security;
create policy "Can view own user data." on users
  for select using ((select auth.uid()) = id);
create policy "Can update own user data." on users
  for update using ((select auth.uid()) = id);

-- TRIGGER ZA NOVE KORISNIKE
create function public.handle_new_user()
returns trigger as
$$
  begin
    insert into public.users (id, full_name, avatar_url)
    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    return new;
  end;
$$
language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- TABELA CUSTOMERS
create table customers (
  id uuid references auth.users not null primary key,
  stripe_customer_id text
);
alter table customers enable row level security;

-- TABELA PRODUCTS
create table products (
  id text primary key,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);
alter table products enable row level security;
create policy "Allow public read-only access." on products
  for select using (true);

-- TABELA PRICES
create type pricing_type as enum ('one_time', 'recurring');
create type pricing_plan_interval as enum ('day', 'week', 'month', 'year');
create table prices (
  id text primary key,
  product_id text references products,
  active boolean,
  description text,
  unit_amount bigint,
  currency text check (char_length(currency) = 3),
  type pricing_type,
  interval pricing_plan_interval,
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);
alter table prices enable row level security;
create policy "Allow public read-only access." on prices
  for select using (true);

-- TABELA SUBSCRIPTIONS
create type subscription_status as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid');
create table subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  status subscription_status,
  metadata jsonb,
  price_id text references prices,
  quantity integer,
  cancel_at_period_end boolean,
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone default timezone('utc'::text, now()),
  cancel_at timestamp with time zone default timezone('utc'::text, now()),
  canceled_at timestamp with time zone default timezone('utc'::text, now()),
  trial_start timestamp with time zone default timezone('utc'::text, now()),
  trial_end timestamp with time zone default timezone('utc'::text, now())
);
alter table subscriptions enable row level security;
create policy "Can only view own subs data." on subscriptions
  for select using ((select auth.uid()) = user_id);

-- REALTIME PRETPLATE
drop publication if exists supabase_realtime;
create publication supabase_realtime for table products, prices;
```

![](../../images/1-Tables-Created.png)

> Napomena
> **Objašnjenje SQL Koda:**
> - **Users Tabela:** Čuva podatke o korisnicima sa sigurnošću na nivou reda kako bi se osiguralo da korisnici mogu pregledati i ažurirati samo svoje podatke.
> - **Trigger za nove korisnike:** Automatski kreira unos u `users` tabeli kada se novi korisnik registruje.
> - **Customers Tabela:** Povezuje ID korisnika sa Stripe ID-om korisnika, nije dostupno korisnicima.
> - **Products Tabela:** Čuva detalje o proizvodima, dostupno svima u read-only načinu.
> - **Prices Tabela:** Čuva detalje o cijenama, sinhronizovano sa Stripe-om, dostupno svima u read-only načinu.
> - **Subscriptions Tabela:** Čuva detalje o pretplatama, osiguravajući da korisnici mogu pregledati samo svoje pretplate.
> - **Realtime Pretplate:** Omogućava real-time praćenje na javnim tabelama `products` i `prices`.

### Dodatne Tabele i Politike

1. **Tracks Tabela**

![](../../images/2-Table-Policies.png)

```sql
create table public.tracks (
  id bigint generated by default as identity,
  created_at timestamp with time zone not null default now(),
  title text null,
  track_path text null,
  image_path text null,
  gif_path text null,
  author
  text null,
  user_id uuid null,
  constraint tracks_pkey primary key (id),
  constraint tracks_user_id_fkey foreign key (user_id) references users (id) on delete cascade
) tablespace pg_default;
```

2. **Politike za Tracks Tabelu**

```sql
alter policy "Omogući čitanje svim korisnicima" on "public"."tracks" to public using (true);
create policy "Omogući unos samo autentificiranim korisnicima" on "public"."tracks" as PERMISSIVE for INSERT to authenticated with check (true);
```

3. **Tabela Liked Tracks**

```sql
create table public.liked_tracks (
  user_id uuid not null,
  created_at timestamp with time zone not null default now(),
  track_id bigint not null,
  constraint liked_tracks_pkey primary key (user_id, track_id),
  constraint liked_tracks_track_id_fkey foreign key (track_id) references tracks (id) on delete cascade,
  constraint liked_tracks_user_id_fkey foreign key (user_id) references users (id) on delete cascade
) tablespace pg_default;
```

4. **Politike Tabele Omiljenih Pjesama**

![](../../images/3-Bucket-Policies.png)

```sql
alter policy "Dozvoli brisanje korisnicima na osnovu user_id" na "public"."liked_tracks" za javno korištenje (((SELECT auth.uid() AS uid) = user_id));
```

5. **Postavljanje Skladišta**

1. **Kreiranje Kanti**
    - **Kanta za Pjesme:** Ograničena na audio/mpeg.
    - **Kante za Slike i GIF-ove:** Nema ograničenja tipova.

2. **Politike Skladišta za Kantu za Pjesme**

![](../../images/Liked-Tracks-RLS-Policies.png)

```sql
CREATE POLICY "Dozvoli sve 1kpor60 0" NA storage.objects ZA SELECT ZA public KORIŠTENJEM (bucket_id = 'pjesme');
CREATE POLICY "Dozvoli sve 1kpor60 1" NA storage.objects ZA INSERT ZA public SA PROVJEROM (bucket_id = 'pjesme');
CREATE POLICY "Dozvoli sve 1kpor60 2" NA storage.objects ZA UPDATE ZA public KORIŠTENJEM (bucket_id = 'pjesme');
CREATE POLICY "Dozvoli sve 1kpor60 3" NA storage.objects ZA DELETE ZA public KORIŠTENJEM (bucket_id = 'pjesme');
```

