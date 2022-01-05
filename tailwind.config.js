const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      white: "#FFF",
      light: "#EEE",
      accent: "#72D298",
      dark: "#C4C4C4",
      black: "#000",
    },
  },
  plugins: [
    // Colorization thanks to https://codepen.io/sosuke/pen/Pjoqqp
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".colorize-light": {
          filter:
            "brightness(0) saturate(100%) invert(98%) sepia(3%) saturate(5426%) hue-rotate(303deg) brightness(108%) contrast(100%)",
        },
        ".colorize-mid": {
          filter:
            "brightness(0) saturate(100%) invert(89%) sepia(16%) saturate(829%) hue-rotate(322deg) brightness(103%) contrast(88%)",
        },
        ".colorize-dark": {
          filter:
            "brightness(0) saturate(100%) invert(43%) sepia(5%) saturate(4120%) hue-rotate(339deg) brightness(98%) contrast(90%)",
        },
        ".colorize-black": {
          filter:
            "brightness(0) saturate(100%) invert(7%) sepia(13%) saturate(1156%) hue-rotate(4deg) brightness(103%) contrast(95%)",
        },
      });
    }),
  ],
};
