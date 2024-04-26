// tailwind.config.js
import type { Config } from 'tailwindcss'

const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          foreground: '#FFFFFF',
          DEFAULT: '#52b032',
          50: '#eef7eb',
          100: '#cbe7c2',
          200: '#a9d899',
          300: '#86c870',
          400: '#63b847',
          500: '#52b032',
          600: '#4a9e2d',
          700: '#397b23',
          800: '#295819',
          900: '#19350f'
        },
        secondary: {
          foreground: '#FFFFFF',
          DEFAULT: '#f45302',
          50: '#feeee6',
          100: '#fccbb3',
          200: '#faa981',
          300: '#f7874e',
          400: '#f5641b',
          500: '#f45302',
          600: '#dc4b02',
          700: '#ab3a01',
          800: '#7a2a01',
          900: '#622101'
        },
        success: {
          foreground: '#FFFFFF',
          DEFAULT: '#006fee',
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66aaf9',
          400: '#338ef7',
          500: '#006fee',
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731'
        },
        focus: '#52b032'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
}

export default config