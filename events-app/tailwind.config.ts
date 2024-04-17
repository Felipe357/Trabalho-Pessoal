import type { Config } from "tailwindcss";

const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      "events": {
              colors: {
                primary: {
                  50: "#3E7E28",
                  100: "#FFF",
                  200: "#FFF",
                  300: "#FFF",
                  400: "#FFF",
                  500: "#DD62ED",
                  600: "#F182F6",
                  700: "#FCADF9",
                  800: "#FFF",
                  DEFAULT: "#3E7E28",
                  foreground: "#ffffff",
                },
                warning: {
                  DEFAULT: "#F45302",
                  foreground: "#ffffff",
                },
                focus: "#3E7E28",
              },
            },
  }
  })
],
};
export default config;
