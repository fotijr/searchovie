module.exports = {
  content: ['./src/**/*.{ts,tsx}', './index.html'],

  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
