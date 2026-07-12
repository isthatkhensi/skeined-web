/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF6F0',
        surface: '#FFFFFF',
        elevated: '#F4F3FA',
        primary: '#B8AACF',
        'primary-light': '#DDD7EC',
        'primary-dark': '#7B6A9F',
        secondary: '#CFD0BA',
        'sage-light': '#EAF0E6',
        linen: '#D6D0C2',
        'text-1': '#111111',
        'text-2': '#6B7280',
        'text-3': '#9CA3AF',
        cobweb: '#D4D0DC',
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        pill: '9999px',
      },
      boxShadow: {
        DEFAULT: '0 1px 4px rgba(0,0,0,0.08)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
