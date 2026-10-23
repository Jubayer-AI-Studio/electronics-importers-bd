import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf9f0',
          100: '#f9f1dc',
          200: '#f1deb4',
          300: '#e7c888',
          400: '#dcb05a',
          500: '#b8860b',
          600: '#966838',
          700: '#754e26',
          800: '#5a3b1c',
          900: '#3d2511',
          accent: '#c8963e',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
          hover: '#20BA56',
        },
        surface: {
          light: '#FDFBF7',
          muted: '#F5EFE6',
          card: '#FFFFFF',
        },
        text: {
          main: '#1F1A17',
          muted: '#6B5E55',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        bengali: ['var(--font-hind-siliguri)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(150, 104, 56, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(150, 104, 56, 0.16), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
