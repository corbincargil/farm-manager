import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

declare module "@mui/material/styles" {
  interface CustomTheme {
    custom?: {
      sustom?: string;
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4e7cab",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3a90aa",
    },
    warning: {
      main: "#ed6c02",
    },
    text: { primary: "#000000", secondary: "#000000" },
    background: {
      default: "#ffffff",
      paper: "#f8f8f8",
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
      dark: "#20b000",
      contrastText: "#000000",
    },
    secondary: {
      main: "#492c12",
      light: "#583b21",
    },
    warning: {
      main: "#ed6c02",
    },
    text: { primary: "#ffffff", secondary: "#ffffff" },
    background: {
      default: "#6b6b6b",
      paper: "#272321",
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
