import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        paper: '#FAFAFA',
        brand: {
          DEFAULT: '#8B1FE0',
          deep: '#6E12C0',
          soft: '#F4E9FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 24px 60px -36px rgba(10, 10, 10, 0.45)',
        glow: '0 24px 60px -28px rgba(139, 31, 224, 0.55)',
      },
    },
  },
  plugins: [],
};

export default config;
