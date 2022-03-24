module.exports = {
  content: ['./src/**/*.{ts,tsx}', './index.html'],

  theme: {
    extend: {
      colors: {
        ovieblue: '#2e88ff'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
