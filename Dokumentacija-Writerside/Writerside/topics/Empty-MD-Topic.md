# Integracija Supabase-a s TypeScript Tipovima

## Korak 1: Instalacija Supabase CLI-a

Za početak, instaliran je Supabase CLI alat kao razvojna zavisnost. Ovaj alat pomaže u generisanju TypeScript tipova iz PostgreSQL šeme.

```Shell
npm i supabase@">=1.8.1" --save-dev
```

Objašnjenje

- `npm i supabase@">=1.8.1" --save-dev`: Instalira se Supabase CLI paket s verzijom većom ili jednakom 1.8.1 kao razvojna zavisnost. `--save-dev` flag osigurava da se koristi samo u razvoju.

## Korak 2: Prijava u Supabase

Potrebno je prijaviti se u Supabase kako bi se generisali tipovi. Ovo zahtijeva token za pristup, koji se može generisati sa stranice postavki Supabase projekta.

```Shell
npx supabase login
```

Objašnjenje

- `npx supabase login`: Poziva se unos Supabase tokena za pristup, autentifikujući sesiju i omogućavajući pristup projektu.

## Korak 3: Generisanje TypeScript tipova

Sa prijavljenim CLI-jem, generisani su TypeScript tipovi na osnovu PostgreSQL šeme.

```Shell
npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > types_db.ts
```

Objašnjenje

- `npx supabase gen types typescript`: Pokreće se Supabase CLI za generisanje TypeScript tipova.
- `--project-id "$PROJECT_REF"`: Specifikuje ID Supabase projekta.
- `--schema public`: Ukazuje na šemu za koju se generišu tipovi, u ovom slučaju `public` šema.
- `> types_db.ts`: Preusmjerava generisane tipove u fajl pod imenom `types_db.ts`.

Nakon ovog koraka, `types_db.ts` fajl će sadržavati TypeScript tipove za tabele i kolone iz PostgreSQL šeme.

Link do [types_db.ts](https://github.com/SafetImamovic/MusicStreamingService/blob/168a6be7bd7ed5989d6ef8bbeea168ac2756eb42/types_db.ts)

## Korak 4: Postavljanje Supabase i User Context Providera

### 4.1: Kreiranje direktorija i fajla

Kreiran je direktorij pod nazivom `providers` i fajl pod nazivom `SupabaseProvider.tsx` u Next.js projektu.

```Shell
mkdir providers
touch providers/SupabaseProvider.tsx
```

### 4.2: Instalacija Supabase Auth Helpers

Instalirani su potrebni paketi za upravljanje Supabase autentifikacijom u Next.js i React.

```Shell
npm install @supabase/auth-helpers-nextjs @supabase/auth-helpers-react
```

### 4.3: Implementacija SupabaseProvider

[Sljedeći kod je dodan u `SupabaseProvider.tsx` kako bi se kreirao Supabase klijent i obezbijedio kontekst sesije.](https://github.com/SafetImamovic/MusicStreamingService/blob/4ac3ec20ea1d576d49a7e1b7a674a972ba0ab0f8/providers/SupabaseProvider.tsx)

### 4.4: Omotavanje glavnog layouta sa SupabaseProvider

[`layout.tsx` je izmijenjen kako bi uključio `SupabaseProvider`.](https://github.com/SafetImamovic/MusicStreamingService/blob/4ac3ec20ea1d576d49a7e1b7a674a972ba0ab0f8/app/layout.tsx)

## Korak 5: Postavljanje User Context-a

### 5.1: Kreiranje direktorija i fajlova za hookove

Kreiran je direktorij `hooks` i fajl `useUser.tsx`.

```Shell
mkdir hooks
touch hooks/useUser.tsx
```

### 5.2: Definisanje tipova korisnika

[Novi fajl `types.ts` je dodat u korijenu projekta kako bi se definisali TypeScript tipovi za detalje korisnika, proizvode, cijene i pretplate.](https://github.com/SafetImamovic/MusicStreamingService/blob/4ac3ec20ea1d576d49a7e1b7a674a972ba0ab0f8/types.ts)

### 5.3: Implementacija useUser hook-a

[Sljedeći kod je dodat u `useUser.tsx` kako bi se upravljalo korisničkim kontekstom i detaljima pretplate.](https://github.com/SafetImamovic/MusicStreamingService/blob/4ac3ec20ea1d576d49a7e1b7a674a972ba0ab0f8/hooks/useUser.tsx)

### 5.4: Kreiranje UserProvider-a

[Kreiran je fajl `UserProvider.tsx` u `providers` direktoriju i dodan sljedeći kod.](https://github.com/SafetImamovic/MusicStreamingService/blob/4ac3ec20ea1d576d49a7e1b7a674a972ba0ab0f8/providers/UserProvider.tsx)

### 5.5: Omotavanje layouta sa UserProvider-om

[`layout.tsx` je izmijenjen kako bi uključio `UserProvider`.](https://github.com/SafetImamovic/MusicStreamingService/blob/4ac3ec20ea1d576d49a7e1b7a674a972ba0ab0f8/app/layout.tsx)

---