// tailwind.config.js
module.exports = {
  content: [
    "./index.html",       // <-- ye add karo
    "./src/**/*.{js,jsx}", // <-- aur ye React ke liye
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lato : ["Lato", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

