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

Sljedeći kod je dodan u `SupabaseProvider.tsx` kako bi se kreirao Supabase klijent i obezbijedio kontekst sesije.

```Typescript
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "@/types_db";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(() => createClientComponentClient<Database>());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
```

### 4.4: Omotavanje glavnog layouta sa SupabaseProvider

`layout.tsx` je izmijenjen kako bi uključio `SupabaseProvider`.

```Typescript
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Streaming Service",
  description: "Listen to the BEST song!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <Sidebar>
            {children}
          </Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  );
}
```

## Korak 5: Postavljanje User Context-a

### 5.1: Kreiranje direktorija i fajlova za hookove

Kreiran je direktorij `hooks` i fajl `useUser.tsx`.

```Shell
mkdir hooks
touch hooks/useUser.tsx
```

### 5.2: Definisanje tipova korisnika

Novi fajl `types.ts` je dodat u korijenu projekta kako bi se definisali TypeScript tipovi za detalje korisnika, proizvode, cijene i pretplate.

```Typescript
import Stripe from "stripe";

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}
```

### 5.3: Implementacija useUser hook-a

Sljedeći kod je dodat u `useUser.tsx` kako bi se upravljalo korisničkim kontekstom i detaljima pretplate.

```Typescript
import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from('users').select('*').single();
  const getSubscription = () =>
    supabase.from("subscriptions")
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserDetails);
        }

        if (subscriptionPromise.status === "fulfilled") {
          setSubscription(subscriptionPromise.value.data as Subscription);
        }

        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {


    throw new Error('useUser must be used within a MyUserContextProvider');
  }
  return context;
};
```

### 5.4: Kreiranje UserProvider-a

Kreiran je fajl `UserProvider.tsx` u `providers` direktoriju i dodan sljedeći kod.

```Typescript
"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return (
    <MyUserContextProvider>
      {children}
    </MyUserContextProvider>
  );
};

export default UserProvider;
```

### 5.5: Omotavanje layouta sa UserProvider-om

`layout.tsx` je izmijenjen kako bi uključio `UserProvider`.

```Typescript
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Streaming Service",
  description: "Listen to the BEST song!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <UserProvider>
            <Sidebar>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
```

## Korak 6: Instalacija Stripe-a

Instalirana je Stripe biblioteka za upravljanje podacima vezanim za Stripe.

```Shell
npm i stripe
```

---