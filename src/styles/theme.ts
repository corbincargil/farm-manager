import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#9c27b0",
    },
    warning: {
      main: "#ed6c02",
    },
    action: {
      active: "rgba(252, 0, 0, 0.536)",
    },
    text: { primary: "#000000", secondary: "#000000" },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2fff00",
    },
    secondary: {
      main: "#9c27b0",
    },
    warning: {
      main: "#ed6c02",
    },
    action: {
      active: "rgba(252, 0, 0, 0.536)",
    },
    text: { primary: "#ffffff", secondary: "#ffffff" },
    background: {
      default: "6b6b6b",
      paper: "#6b6b6b",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
  },
});
