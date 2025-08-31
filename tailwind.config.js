/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        darkBackground: '#1a1a1a', // Dark background color
        darkText: '#e0e0e0', // Light text for dark mode
        darkAccent: '#3a3a3a', // Darker accents
        lightBackground: '#ffffff', // Light background color
        lightText: '#333333', // Regular text for light mode
      },
    },
  },
  darkMode: 'media', // Automatically detects system dark mode preference
  variants: {
    extend: {},
  },
  plugins: [],
};
