/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./components/**/*.js",
    "./main.js"
  ],
  safelist: [
    'translate-x-0',
    '-translate-x-full',
    'rtl:translate-x-0',
    'rtl:translate-x-full',
    'opacity-100',
    'opacity-0',
    'invisible'
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors (used across all pages)
        primary: '#4A8C5C',
        dark: '#1B3A2D',
        light: '#F7F7F2',
        body: '#333333',
        muted: '#777777',
        border: '#E0E0E0',

        // Brand aliases (about, farms, trade-export pages)
        brand: '#4A8C5C',
        'brand-dark': '#1B3A2D',
        'panel-alt': '#F5F5F0',
        'light-bg': '#F7F7F2',

        // Certification / Contact / Agri-inputs pages
        'cert-primary': '#1B4332',
        'cert-secondary': '#2D6A4F',
        'cert-accent': '#C9A84C',
        'cert-cream': '#F5F0E8',
        'cert-dark': '#0D2B1E',

        // Food-processing page
        secondary: '#2D6A4F',
        accent: '#C9A84C',
        cream: '#F5F0E8',
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.05)',
        glow: '0 10px 30px rgba(74, 140, 92, 0.2)',
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
