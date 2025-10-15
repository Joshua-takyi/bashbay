// hero.ts
import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    light: {
      colors: {
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316", // Main Orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          DEFAULT: "#f97316",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#dc2626", // Red
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#22c55e",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
      },
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: "#fb923c", // Lighter Orange for dark mode
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ef4444", // Lighter Red for dark mode
          foreground: "#ffffff",
        },
      },
    },
  },
});
