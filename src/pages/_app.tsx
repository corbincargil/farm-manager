import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";
import { lightTheme, darkTheme } from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <Layout mode={mode} setMode={setMode}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
