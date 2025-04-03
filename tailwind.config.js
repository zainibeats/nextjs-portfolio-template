/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // Covers all source files
    "./src/app/**/*.{js,ts,jsx,tsx}",  // Explicitly include app router
    "./src/components/**/*.{js,ts,jsx,tsx}"  // Explicitly include components
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 1s infinite',  // Your custom bounce
        'fade-in-up': 'fadeInUp 0.8s ease-out'  // Add your custom animation
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      }
    },
  },
  plugins: [],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true, // Optimize hover states for touch devices
  }
};