/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        taxi: {
          black: '#111111',
          charcoal: '#1C1C1C',
          dark: '#141414',
          yellow: '#F5C400',
          yellowHover: '#E5B700',
          yellowLight: '#FFF9E5',
          bg: '#F7F7F5',
          card: '#FFFFFF',
          border: '#E8E8E4',
          text: '#555555',
          heading: '#111111',
          muted: '#888884',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(17, 17, 17, 0.05), 0 4px 16px -4px rgba(17, 17, 17, 0.05)',
        'elevated': '0 10px 30px -10px rgba(17, 17, 17, 0.08), 0 4px 12px -2px rgba(17, 17, 17, 0.04)',
      },
    },
  },
  plugins: [],
}
