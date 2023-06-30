/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#3B71CA",
                primary: {
                    50: "#F1F5FB",
                    100: "#E3EBF7",
                    200: "#C7D7F0",
                    300: "#ABC2E8",
                    400: "#8FAEE0",
                    500: "#6590D5",
                    600: "#3061AF",
                    700: "#285192",
                    800: "#204075",
                    900: "#183058",
                },
            },
        },
    },
    plugins: [],
};
