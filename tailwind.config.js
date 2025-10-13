/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'century-gothic-regular': ['Century Gothic Regular', 'Arial', 'sans-serif'],
        'century-gothic-bold': ['Century Gothic Bold', 'Arial', 'sans-serif'],
        'monument-extended-regular': ['Monument Extended Regular', 'Arial', 'sans-serif'],
        'monument-extended-black': ['Monument Extended Black', 'Arial', 'sans-serif'],
        'calcio': ['Calcio', 'Arial', 'sans-serif'],
        'nos': ['nos', 'Arial', 'sans-serif'],
        'integralcf-reqular-oblique': ['IntegralCF Reqular Oblique', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
