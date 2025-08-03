import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4ECDC4",
          50: "#E8F9F8",
          100: "#D1F3F1",
          200: "#A3E7E3",
          300: "#75DBD5",
          400: "#47CFC7",
          500: "#4ECDC4",
          600: "#3EA49E",
          700: "#2E7B77",
          800: "#1F5250",
          900: "#0F2928",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#95A5A6",
          50: "#F8F9F9",
          100: "#ECF0F1",
          200: "#D5DBDC",
          300: "#BDC6C7",
          400: "#A6B1B2",
          500: "#95A5A6",
          600: "#7B8C8D",
          700: "#5D6D6E",
          800: "#3E4E4F",
          900: "#1F2F30",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#E8F6F3",
          50: "#F7FCFB",
          100: "#E8F6F3",
          200: "#D1EDE7",
          300: "#BAE4DB",
          400: "#A3DBCF",
          500: "#E8F6F3",
          600: "#8CC8BA",
          700: "#6FB5A1",
          800: "#52A288",
          900: "#358F6F",
          foreground: "#2C3E50",
        },
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#6C757D",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
