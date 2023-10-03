import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";
import { ErrorBoundary } from "react-error-boundary";
import Topbar from "./Topbar";

export default function Layout({ mode, setMode, children }: any) {
  return (
    <>
      <div className={mode === "light" ? styles.layoutLight : styles.layoutDark}>
        <Navbar mode={mode} setMode={setMode} />
        <div className={styles.contentContainer}>
          <Topbar />
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <main className={styles.main}>{children}</main>
            <Footer />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
