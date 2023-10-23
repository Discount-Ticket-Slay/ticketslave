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
  },
  plugins: [],
}

