/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#645A4A',
        'bg': '#F4EDE4',
        'accent': '#94B1D8',
        'border': '#E0C58F',
        'header': '#6091D2',
        'hero-start': '#09172A',
        'hero-mid': '#5076A8',
        'purple': '#69639E',
        'footer': '#645A4A',
      },
      fontFamily: {
        'heading': ['Arvo', 'Georgia', 'serif'],
        'sans': ['Aleo', 'Georgia', 'serif'],
      },
      height: {
        'hero': '678px',
        'section': '160px',
      },
    },
  },
  plugins: [],
}