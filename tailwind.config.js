/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled directly from the ZABACCO mark
        leaf: '#7FB927',
        flame: '#EF3B0C',
        palm: '#00703A',
        // The dark ground: palm green taken down to near-black
        abyss: '#03170D',
        forest: '#072A18',
        canopy: '#0C3F24',
        // Quiet type on dark ground
        frond: '#9CC4A9',
        // Light grounds
        ivory: '#F7F6F1',
        husk: '#EAE7DC',
        ink: '#0B1410',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.045em' },
      maxWidth: { prose: '68ch' },
      transitionTimingFunction: { tide: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      boxShadow: {
        lift: '0 24px 60px -28px rgba(3, 23, 13, 0.55)',
        plate: '0 18px 44px -22px rgba(3, 23, 13, 0.45)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawline: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        driftin: {
          '0%': { opacity: '0', transform: 'scale(1.06)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        drawline: 'drawline 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both',
        driftin: 'driftin 1.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
