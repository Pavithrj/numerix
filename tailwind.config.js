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
                "fade-in-out": "fadeInOut 2s ease-in-out",
                "fadeInUp": "fadeInUp 0.4s ease-out"
            },
            keyframes: {
                fadeInOut: {
                    "0%, 100%": { opacity: "0" },
                    "10%, 90%": { opacity: "1" }
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" }
                }
            }
        }
    },
    plugins: []
};