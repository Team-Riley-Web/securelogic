/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        slate: {
          50: 'hsl(210 40% 98%)',
          100: 'hsl(210 38% 95%)',
          200: 'hsl(214 32% 88%)',
          300: 'hsl(214 25% 78%)',
          400: 'hsl(215 20% 62%)',
          500: 'hsl(216 16% 47%)',
          600: 'hsl(218 18% 34%)',
          700: 'hsl(219 22% 25%)',
          800: 'hsl(220 28% 17%)',
          900: 'hsl(222 35% 11%)',
        },
        primary: {
          50: 'hsl(211 100% 97%)',
          100: 'hsl(211 92% 92%)',
          200: 'hsl(211 86% 84%)',
          300: 'hsl(211 80% 72%)',
          400: 'hsl(211 74% 58%)',
          500: 'hsl(211 72% 43%)',
          600: 'hsl(214 70% 35%)',
          700: 'hsl(216 64% 28%)',
          800: 'hsl(218 58% 22%)',
          900: 'hsl(220 52% 17%)',
        },
        botanical: {
          50: 'hsl(104 52% 96%)',
          100: 'hsl(104 48% 89%)',
          200: 'hsl(104 44% 79%)',
          300: 'hsl(104 40% 67%)',
          400: 'hsl(104 37% 55%)',
          500: 'hsl(104 39% 44%)',
          600: 'hsl(105 43% 34%)',
          700: 'hsl(107 44% 26%)',
          800: 'hsl(110 42% 20%)',
          900: 'hsl(112 38% 15%)',
        },
        canopy: {
          DEFAULT: 'hsl(160 34% 14%)',
          light: 'hsl(154 36% 20%)',
        },
      },
      boxShadow: {
        lift: '0 18px 45px hsl(222 35% 11% / 0.12), 0 2px 8px hsl(222 35% 11% / 0.08)',
        deep: '0 26px 70px hsl(222 35% 11% / 0.20), 0 4px 12px hsl(222 35% 11% / 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        mist: {
          from: { transform: 'translate3d(-4%, 2%, 0)' },
          to: { transform: 'translate3d(6%, -3%, 0)' },
        },
      },
    },
  },
  plugins: [],
};
