import { createTheme } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles";
const theme = createTheme({
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

export default theme;
