/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        foreground: {
          50: 'rgb(var(--foreground-50) / &lt;alpha-value&gt;)',
          500: 'rgb(var(--foreground-500) / &lt;alpha-value&gt;)',
          950: 'rgb(var(--foreground-950) / &lt;alpha-value&gt;)',
        }
      }
    },
  },
  plugins: [],
};