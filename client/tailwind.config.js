/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'body-backgroud': '#193856',
        'btn-backgroud': '#2F7D83',
        'gold-color': '#FFE019',
        'opacity7-backgroud': 'rgba(0, 0, 0, 0.7)',
        'opacity9-backgroud': 'rgba(0, 0, 0, 0.9)',
        'acaccent': '#F37A51',
        'grey-backgroud': '#474A4D',
      },
    },
  },
  plugins: [],
}