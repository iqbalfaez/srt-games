/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        'kkm-blue': {
          DEFAULT: '#1e3a8a',
          light: '#3b82f6',
          dark: '#172554',
          soft: '#eff6ff',
        },
        'kkm-teal': {
          DEFAULT: '#0f766e',
          light: '#14b8a6',
          soft: '#f0fdfa',
        },
        'kkm-red': {
          DEFAULT: '#b91c1c',
          light: '#ef4444',
          soft: '#fef2f2',
        },
        'kkm-green': {
          DEFAULT: '#15803d',
          light: '#22c55e',
          soft: '#f0fdf4',
        },
        'kkm-amber': {
          DEFAULT: '#b45309',
          light: '#f59e0b',
          soft: '#fffbeb',
        },
      },
      keyframes: {
        stampSlam: {
          '0%': { transform: 'scale(2.4) rotate(-14deg)', opacity: '0' },
          '60%': { transform: 'scale(0.95) rotate(-6deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-8deg)', opacity: '1' },
        },
        radarPing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.85' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'stamp-slam': 'stampSlam 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'radar-ping': 'radarPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
        'slide-in-right': 'slideInRight 0.25s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.28s ease-out forwards',
      },
    },
  },
  plugins: [],
};
