/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'background-start': '#1A0D2B', // For gradients or base background
        'background-end': '#2D1B4A',
        'card-bg': '#3B2D71', // Card background
        'button-bg': '#9333EA', // Buttons
        'button-hover': '#7E22CE', // Button hover
        'accent-yellow': '#FACC15', // Yellow highlights
        'text-primary': '#FFFFFF', // Main text
        'text-secondary': '#D1D5DB', // Secondary text
        'wave-purple': '#582F9D', // Wave patterns or icons
      },
      backgroundImage: {
        'wavy-purple': "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23582f9d\' fill-opacity=\'0.3\' d=\'M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,122.7C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'/%3E%3C/svg%3E')",
        'card-pattern': "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23582f9d\' fill-opacity=\'0.1\' d=\'M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,122.7C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'/%3E%3C/svg%3E')",
      },
      boxShadow: {
        '3d': '0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)',
        'glass': '0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1)', // Custom for glassmorphism
      },
      backdropBlur: {
        'xl': '20px', // Enhanced blur for glassmorphism
      },
      maxWidth: {
        '6xl': '72rem',
        '7xl': '88rem',
      },
    },
  },
  plugins: [],
};