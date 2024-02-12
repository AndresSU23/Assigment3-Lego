/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.html`], // all .html files
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ["nord", "emerald", "autumn", "fantasy", "pastel", "dracula"],
  },
  // ...
};

