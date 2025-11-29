/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    container: {
      center: "true",
      padding: "1rem",
      direction: "rtl"
    },
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        'brand-primary': '#FF4D4F', // (sell,action)
        'brand-secondary': '#1D3557', // (dark blue, reliability)
        'neutral-text': '#4A4A4A',  // (gray for texts)
        'success': '#52B788',       // (confirm green)
        // --- gray---
        'base-white': '#FFFFFF',         // (base bg )
        'gray-text': '#4A4A4A',          // (base text)
        'gray-medium': '#9B9B9B',        // (second texts / Placeholder)
        'gray-light': '#E0E0E0',         // ( separate lines / Borders)
        'gray-bg': '#F5F5F5',            // (second bg)
      }
    }
  }
}