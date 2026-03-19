/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#C5FF4B',
        'accent-dark': '#A8E640',
        dark: '#0A0A0F',
        surface: '#1E1E2A',
        'surface-light': '#2A2A3A',
        border: '#15151D',
        // Add the missing color variants that are used in components
        'dark-bg': '#0A0A0F',
        'dark-surface': '#1E1E2A',
        'dark-surface-light': '#2A2A3A',
        'dark-border': '#15151D',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to right bottom, #0A0A0F, #1A1A25)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(197, 255, 75, 0.15)',
        'neon-strong': '0 0 30px rgba(197, 255, 75, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(197, 255, 75, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(197, 255, 75, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}