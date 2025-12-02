import type { Config } from "tailwindcss";

const config: Config = {
    // 🌙 DARK MODE CONFIGURATION
    // "class" = manually toggle dark mode by adding/removing "dark" class
    // Jab <html class="dark"> hoga, tab dark mode ON
    darkMode: "class",

    // 📁 CONTENT PATHS - Tailwind ko batao kahan classes search karni hain
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            colors: {
                // 🎨 IVS School Brand Colors - Easy to Remember!

                // 🔵 PRIMARY = School Blue (buttons, links, main brand)
                // Rule: 500 = main color, smaller = lighter, bigger = darker
                primary: {
                    500: '#3b82f6', // ← YE HAI MAIN BLUE - bas isko yaad rakho!
                    600: '#2563eb', // hover state ke liye
                    700: '#1d4ed8', // active/pressed state
                },

                // 🟣 ACCENT = Purple (highlights, badges, special elements)
                accent: {
                    500: '#d946ef', // ← MAIN PURPLE for badges/highlights
                    600: '#c026d3',
                },

                // ⚫ NEUTRAL = Grey (text, borders, backgrounds)
                neutral: {
                    50: '#f9fafb',   // ← LIGHTEST - backgrounds
                    100: '#f3f4f6',  // cards background
                    200: '#e5e7eb',  // borders
                    600: '#4b5563',  // secondary text
                    800: '#1f2937',  // ← DARKEST - headings
                },
            },

            // 📝 FONTS - Google Fonts se import karein
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },

            // 🎬 ANIMATIONS - Smooth effects
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },

            // 🌫️ SHADOWS - Card shadows
            boxShadow: {
                'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
                'medium': '0 4px 20px rgba(0, 0, 0, 0.12)',
            },
        },
    },
    plugins: [],
};

export default config;