/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Mengaktifkan mode gelap berbasis class dari AppContext
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Membaca seluruh file React Anda
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],     // Mengaktifkan font Inter
        tech: ['Orbitron', 'sans-serif']   // Mengaktifkan font Orbitron
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        }
      }
    },
  },
  plugins: [],
}