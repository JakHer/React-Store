module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E2A47',
        secondary: '#58A6FF', 
        hover: '#A1B3D1',
        text: '#F5F5F5', 
        grayLight: '#D1D5DB',
        background: 'transparent', 
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
