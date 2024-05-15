import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'text-neutral-400', // Example primary color
        secondary: '#00ff00', // Example secondary color
        third: '#00ffff', //Example Third color
        fourth: '#ffffff', //neutral white 
      },
      spacing: {
        custom: '1rem', // Example custom spacing
      },
    },
  },
  plugins: [],
};
export default config;
