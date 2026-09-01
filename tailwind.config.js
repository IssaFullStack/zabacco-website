/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Indian Ocean water column — the brand's base
        abyss: '#04211D',
        deep: '#08352C',
        reef: '#0E5A49',
        // Sea glass, for quiet type on dark ground
        seaglass: '#8FB8A8',
        // Coral, taken from the mark. Used sparingly.
        coral: '#D9542B',
        // Brass, from the studs on Stone Town doors
        brass: '#C3A05A',
        // Coral-stone walls of Stone Town
        limestone: '#F3F1EA',
        sand: '#E5E0D3',
        ink: '#0A1512',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        tide: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        drawline: 'drawline 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both',
      },
    },
  },
  plugins: [],
}
