// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        glass: 'var(--glass-color)',
        tertiary: 'var(--tertiary-color)',
        'tertiary-light': 'var(--tertiary-color-light)',
        background: 'var(--background-color)',
        'background-light': 'var(--background-color-light)',
        'background-dark': 'var(--background-color-dark)',
      },
    },
  },
  plugins: [],
} satisfies Config;
