/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT")
module.exports = withMT( {
  content: [ 
    "./views/*.ejs",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        whitesmoke: "#f8f8f8",
        yellowgreen: "#a3f263",
        black: "#000",
        coral: "#fe7b5f",
        gray: "#141414",
        lavender: "#c9a0ff",
        lightyellow: "#fede67",
        lightorange: "#ff9a62"
      },
      fontFamily: {
        inter: "Inter",
        poppins: "Poppins",
      },
      borderRadius: {
        "37xl": "56px",
      },
    },
    fontSize: {
      inherit: "inherit",
    },
    screens: {
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
});
