/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'header-stroke': "url('/src/assets/img/stroke-header.png')",
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
            colors: {
                'dark-theme': '#18191A',
                'gray-dark': '#242526',
                'search-gray-dark': '#3A3B3C',
                'button-primary': '#FF3B5C',
                'hover-button-primary': '#FE2C55',
                'stroke-gray': '#424249',
                'placeholder-gray': 'rgba(176,179,184,0.7)',
            },
        },
    },
    plugins: [],
};
