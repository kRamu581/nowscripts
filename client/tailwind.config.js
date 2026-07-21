/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        now: {
          primary: '#FF5A5F', // Logo dot color (Amber/Pink-Red)
          background: '#F8F9FB', // Light gray background
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E5E7EB',
          accent: '#E82C45', // slightly darker for hover/accents
          text: '#1F2937', // Slate 800
          muted: '#6B7280' // Gray 500
        }
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'modal': '0 20px 40px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
    },
  },
  plugins: [],
}
