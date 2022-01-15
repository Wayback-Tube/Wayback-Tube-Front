const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      inherit: "inherit",
      accent: "#72D298",
      // Light theme
      "light-accent": "#F00",
      "light-00dp": "#FFFFFF",
      "light-01dp": "#F4F4F4",
      "light-02dp": "#EFEFEF",
      "light-03dp": "#ECECEC",
      "light-04dp": "#E9E9E9",
      "light-06dp": "#E4E4E4",
      "light-08dp": "#E2E2E2",
      "light-12dp": "#DCDCDC",
      "light-16dp": "#DADADA",
      "light-24dp": "#D7D7D7",
      "light-text": "#1C1C1C",
      "light-emphasis": "#000",
      "light-highlight": "#ABECC4",
      // Dark theme
      "dark-accent": "#F00",
      "dark-00dp": "#121212",
      "dark-01dp": "#1D1D1D",
      "dark-02dp": "#212121",
      "dark-03dp": "#242424",
      "dark-04dp": "#262626",
      "dark-06dp": "#2C2C2C",
      "dark-08dp": "#2D2D2D",
      "dark-12dp": "#323232",
      "dark-16dp": "#343434",
      "dark-24dp": "#373737",
      "dark-text": "#999",
      "dark-emphasis": "#DDD",
      "dark-highlight": "#2C523B",
    },
  },
};
