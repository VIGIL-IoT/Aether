/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: '#05070A',
                    panel: '#0B1016',
                    border: '#18222E',
                },
                accent: {
                    primary: '#00D4FF',
                    secondary: '#00FF9D',
                    warning: '#FFC857',
                    danger: '#FF4D6D',
                },
                text: {
                    primary: '#D9E2EC',
                    secondary: '#8B98A8',
                }
            },
            boxShadow: {
                'glow-primary': '0 0 20px rgba(0, 212, 255, 0.3)',
                'glow-secondary': '0 0 20px rgba(0, 255, 157, 0.3)',
            }
        },
    },
    plugins: [],
}