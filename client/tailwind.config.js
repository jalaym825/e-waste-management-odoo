/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'parisienne': ['Parisienne'],
        'poppins': ['Poppins'],
        'MateSC': ['Mate SC'],
        'LibreBaskerville': ['Libre Baskerville'],
        'Outfit': ['Outfit'],
        'Rubik': ['Rubik'],
        'Jost': ['Jost']
      },
      dropShadow: {
        '3xl': '0px 50px 50px rgba(0,0,0,0.7)',
      },
      colors: {
        'primary-color': "#152238",
        // 'primary-color' : "#262e57",
        // 'primary-blue':'#a5e9e8',
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      }
    },
  },
  plugins: []
}