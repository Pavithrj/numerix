/** @type {import("tailwindcss").Config} */

export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            animation: {
                fadeInOut: "fadeInOut 2s ease-in-out",
                fadeInUp: "fadeInUp 0.4s ease-out",
                fadeIn: "fadeIn 1s ease-in-out",
                fadeInDelayed: "fadeIn 1s ease-in-out 0.3s backwards",
                bounceSlow: "bounce 3s infinite",
            },
            keyframes: {
                fadeInOut: {
                    "0%, 100%": { opacity: "0" },
                    "10%, 90%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: 0, transform: "translateY(-10px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                }
            }
        }
    },
    plugins: []
};