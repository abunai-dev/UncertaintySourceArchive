import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.slate,
          0: '#fff',
          970: 'hsl(200, 20%, 16%)',
          975: 'hsl(200, 20%, 13%)',
          1000: '#000'
        },
        link: {
          DEFAULT: '#00c',
          dark: '#0070f3'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
