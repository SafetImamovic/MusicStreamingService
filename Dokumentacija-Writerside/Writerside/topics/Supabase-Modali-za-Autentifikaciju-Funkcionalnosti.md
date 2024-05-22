# Postavljanje Supabase Zavistnosti

## Instalacija Supabase zavisnosti
Instalirano je potrebno pakete za integraciju Supabase autentifikacije u projekt.

```bash
npm install @supabase/auth-helpers-nextjs
npm install @supabase/auth-helpers-react
```

### 2. Supabase Provider
Za konfiguraciju Supabase providera, kreiran je `SupabaseProvider.tsx` u direktoriju `providers`. Ovaj fajl omogućava da cijela aplikacija koristi Supabase instancu.

[SupabaseProvider.tsx](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/providers/SupabaseProvider.tsx)

### 3. Omotavanje Root Layouta
U root layout-u dodan je `SupabaseProvider` kako bi bila dostupna Supabase instanca u cijeloj aplikaciji.

[layout.tsx](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/app/layout.tsx)

## Kreiranje Modalne Komponente

### 1. Instalacija Radix UI
Za izradu modalnih prozora, instalirani su potrebni paketi Radix UI.

```bash
npm install @radix-ui/react-dialog
```

### 2. Modalna Komponenta
Kreirana je modalna komponenta koja koristi Radix UI.

[components/Modal.tsx](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/components/Modal.tsx)

## Modal za Autentifikaciju

### 1. Postavljanje Zustanda za upravljanje stanjem modala
Za upravljanje stanjem modala korišten je Zustand.

```bash
npm install zustand
```

### 2. Zustand Store za Modal
Kreiran je Zustand store koji upravlja stanjem modalnog prozora.

[hooks/useAuthModal.ts](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/hooks/useAuthModal.ts)

### 3. Auth Modal Komponenta
Kreirana je komponenta modalnog prozora za autentifikaciju koja koristi Zustand store.

[components/AuthModal.tsx](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/components/AuthModal.tsx)

### 4. Instalacija Supabase Auth UI zavisnosti
Potrebne su zavisnosti za integraciju Supabase Auth UI komponenti.

```bash
npm install @supabase/auth-ui-react
npm install @supabase/auth-ui-shared
```

## Izmjene na Header-u

### 1. Izmjena Header-a za pokretanje dijaloga za registraciju
U Header komponenti je napravljena izmjena za pokretanje modalnog prozora za registraciju.

[components/Header.tsx](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/components/Header.tsx)

### 2. Konfiguracija GitHub OAuth-a
Omogućen je GitHub kao provider u Supabase postavkama.

### 3. Izmjena Header-a za stanje autentifikacije
Izmijenjen je Header kako bi prikazao stanje autentifikacije korisnika.

[components/Header.tsx](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/components/Header.tsx)

## Notifikacije sa React Hot Toast

### 1. Instalacija React Hot Toast
Za prikaz notifikacija korišten je React Hot Toast.

```bash
npm install react-hot-toast
```

### 2. Toaster Provider
Kreiran je `ToasterProvider.tsx` koji omogućava prikazivanje notifikacija u cijeloj aplikaciji.

[providers/ToasterProvider.tsx](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/providers/ToasterProvider.tsx)

### 3. Dodavanje ToasterProvider-a u Layout
U Layout komponenti je dodan `ToasterProvider` kako bi notifikacije bile dostupne u cijeloj aplikaciji.

[layout.tsx](https://github.com/SafetImamovic/MusicStreamingService/blob/17ac6d8a335b225098d42ab5697db2471b5b2982/app/layout.tsx)

## Dodatni Koraci

- Dodan je `<ModalProvider />` u Layout ispod `<UserProvider>` za bolje upravljanje modalnim prozorima.
- Korištena je dokumentacija Radix UI za dodavanje modalnih prozora.