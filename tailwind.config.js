/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oregano: {
          orange: '#ef8535',
          'orange-dark': '#d97123',
          'orange-light': '#f59e5b',
          cream: '#f9f7dc',
          'cream-soft': '#fdfcf2',
          brown: '#763c00',
          'brown-dark': '#4e2700',
          'brown-light': '#934d05',
          slate: '#304254',
          'slate-dark': '#1e2b38',
          sand: '#f4ede2',
        }
      },
      fontFamily: {
        serif: ['"Young Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Chunk Five"', '"Young Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand': '2px 2px 0px #763c00',
        'brand-lg': '4px 4px 0px #763c00',
        'brand-xl': '6px 6px 0px #763c00',
      }
    },
  },
  plugins: [],
};
