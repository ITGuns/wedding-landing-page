/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'earth': {
                    50: '#FDFCFB',
                    100: '#F7F4F2',
                    200: '#EFE9E5',
                    300: '#E1D4CD',
                    400: '#C9B5A9',
                    500: '#A68D7D',
                    600: '#8A6F5E',
                    700: '#6E5646',
                    800: '#4D3A2F',
                    900: '#2D211A',
                    950: '#1A0A06',
                },
                'sunset': {
                    'start': '#E85E2B',
                    'mid': '#9C3D1E',
                    'end': '#4D1D0F',
                },
                'luxury-copper': '#9C5A3C',
                'terracotta': '#8E4A34',
                'gold': '#C5A059',
                'cream': '#F9F6F1',
            },
            fontFamily: {
                'script': ['"Pinyon Script"', 'cursive'],
                'sans': ['Inter', 'sans-serif'],
                'serif': ['Spectral', 'serif'],
            },
            animation: {
                'float': 'float 7s ease-in-out infinite',
                'float-slow': 'float-slow 9s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}