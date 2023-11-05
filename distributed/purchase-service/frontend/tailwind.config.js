/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      rotate: {
        '30': '30deg',
      },
      perspective: {
        '500': '500px',
      },
    },
    colors: {
      'cottage-brown': '#b6916b',
      'cottage-dark-brown': '#7b592d',
    }
  },
  plugins: [],
}

