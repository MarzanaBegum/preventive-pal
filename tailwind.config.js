/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './src/pages/**/*.{js,ts,jsx,tsx}',
    // './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Font Family
      fontFamily: {
        primary: ['Barlow', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif'],
        arges: ['Arges', 'sans-serif'],
      },

      // colors
      colors: {
        primary: '#5A2F84',
        'primary-text': '#505050',
        'secondary-text': '#333333',
        'orange-100': '#FFB683',
        'orange-200': '#F08D46',
        'orange-300': '#DB732A',
        'purple-100': '#F7F0FF',
        'purple-200': '#5E3B89',
        'purple-300': '#623B88',
        green: '#44B549',
        teal: '#365452',
        gray: '#A7A7A7',
        'bg-cyan': '#EAF5FF',
        'bg-cyan-light': '#E4F5FF',
        'bg-gray': '#F9F9F9',
        'bg-azure-light': '#F6FCFF',
        dark: '#2B2B2B',
      },

      // Media Query screen sizes
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1440px',
        '2xxl': '1700px',
        '3xl': '1920px',
        'max-sm': { max: '374px' },
        'max-md': { max: '767px' },
        'max-lg': { max: '1023px' },
        'max-xl': { max: '1199px' },
        'max-2xl': { max: '1439px' },
        'max-3xl': { max: '1919px' },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hide': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },

          '.scrollbar-default': {
            '-ms-overflow-style': 'auto',
            'scrollbar-width': 'auto',
            '&::-webkit-scrollbar': {
              display: 'block',
            },
          },
        },
        ['responsive']
      );
    },
  ],
};
