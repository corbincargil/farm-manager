import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";
import { lightTheme, darkTheme } from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  const updateTheme = (event: MediaQueryListEvent) => {
    const colorScheme = event.matches ? "dark" : "light";
    setMode(colorScheme);
  };
  useEffect(() => {
    //todo: change to user preference once users are set up so there is no initial flicker of the wrong theme
    window.matchMedia("(prefers-color-scheme: dark)").matches ? setMode("dark") : setMode("light");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);
    return window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", updateTheme);
  }, []);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <Layout mode={mode} setMode={setMode}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
