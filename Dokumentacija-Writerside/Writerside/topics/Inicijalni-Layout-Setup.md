# Inicijalno Postavljanje Layouta

## Postavljanje Projekta i Struktura Fajlova

### Inicijalno Postavljanje

1. **Kreiran `page.tsx`**:
    - Kreiran u root direktoriju aplikacije.
    - Konfigurisan da se prikazuje pri pokretanju stranice koristeći `npm run dev`.

2. **Kreiran `site` Folder**:
    - Smješten u root direktoriju aplikacije.
    - Sadrži `page.tsx` fajl.

3. **Kreiran `components` Folder**:
    - Smješten u root direktoriju.
    - Pohranjuje sve komponente potrebne za stranicu.

## Komponenta Sidebar

1. **Kreiran `Sidebar.tsx`**:
    - Fajl je dizajniran da prikazuje child komponente koristeći sljedeći interfejs i zadatak:

   ```typescript
   interface SidebarProps {
     children: React.ReactNode;
   }

   const Sidebar: React.FC<SidebarProps> = ({ children }) => {
     return (
       <div>
         {children}
       </div>
     );
   }

   export default Sidebar;
   ```

2. **Kreiran `layout.tsx`**:
    - Smješten u folderu aplikacije.
    - Uvozi `Sidebar.tsx` komponentu koristeći:

   ```typescript
   import Sidebar from '@/components/Sidebar';
   ```

## Integracija Ikona

1. **Instaliran `react-icons`**:
    - Korišten za integraciju ikona u sidebar i druge komponente.
    - Instaliran pomoću sljedeće komande:

   ```bash
   npm install react-icons
   ```

2. **Uvezene Ikone**:

   ```typescript
   import { HiHome } from "react-icons/hi";
   import { BiSearch } from "react-icons/bi";
   ```

## Komponenta Box

1. **Kreiran `Box.tsx`**:
    - Smješten u `components` folderu.
    - Koristi `tailwind-merge` za proširenje mogućnosti Tailwind CSS-a.

2. **Instaliran `tailwind-merge`**:
    - Instaliran pomoću sljedeće komande:

   ```bash
   npm install tailwind-merge
   ```

3. **Kod Komponente Box**:

   ```typescript
   import { twMerge } from "tailwind-merge";

   interface BoxProps {
     children: React.ReactNode;
     className?: string;
   }

   const Box: React.FC<BoxProps> = ({ children, className }) => {
     return (
       <div
         className={twMerge(
           `bg-neutral-900 rounded-lg h-fit w-full`,
           className
         )}
       >
         {children}
       </div>
     );
   }

   export default Box;
   ```

## Dodatne Komponente

1. **Kreiran `SidebarItem.tsx`**:
    - Smješten u `components` folderu.
    - Povezan sa `Sidebar.tsx` koristeći:

   ```typescript
   import SidebarItem from "./SidebarItem";
   ```

2. **Kreiran `Library.tsx`**:
    - Smješten u `components` folderu.
    - Koristi se za upload i pohranu pjesama, te upravljanje playlistama.

3. **Kreiran `Header.tsx`**:
    - Smješten u `components` folderu.
    - Koristi se u `page.tsx`.

4. **Kreiran `Button.tsx`**:
    - Smješten u `components` folderu.
    - Koristi se za kreiranje dugmadi za aplikaciju.

## Slike

- Dodana slika za dugme za omiljene pjesme:

  ```
  https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg
  ```

## Završna Implementacija `page.tsx`

Na kraju razvoja, `page.tsx` fajl je izgledao ovako:

```typescript
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <Header>
        <div className="mb-2">
          <h1 className="
            text-white
            text-3xl
            font-semibold
          ">
            Dobrodošli Nazad
          </h1>
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          ">
            <ListItem 
              image="/images/liked.png"
              name="Omiljene Pjesme"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Najnovije Pjesme
          </h1>
        </div>
        <div>
          Lista Pjesama!
        </div>
      </div>
    </div>
  )
}
```