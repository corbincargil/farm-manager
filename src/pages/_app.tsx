import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";
import { Inter } from "next/font/google";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </main>
  );
}
