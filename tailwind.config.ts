import type {Config} from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  darkMode: "class",
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screen/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3E62",
        secondary: "#FF6500",
      },
    },
  },
};
export default config;
