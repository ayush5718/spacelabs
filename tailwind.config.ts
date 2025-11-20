import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        'boulder-black': '#050505',
        'boulder-gray': '#141414',
        'boulder-accent': '#333',
      },
      cursor: {
        'none': 'none',
      }
    },
  },
  plugins: [],
};
export default config;

