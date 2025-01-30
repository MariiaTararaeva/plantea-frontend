/** @type {import('tailwindcss').Config} */
export default {
    corePlugins: {
       preflight: false, // Disable global resets
      },
    content: [
    // "./index.html",
      "./src/components/Navbar.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        spacing: {
          '0.5': '0.1rem', // Smaller spacing value
        },
        fontFamily: {
            custom: ["AdaleMono", "monospace"], // Add AdaleMono as the default monospace font
 
        },
        colors: {
            customDark: "rgb(32, 6, 6)", // Add a custom color
          },
      },
    },
    plugins: [],
  }
  
  
