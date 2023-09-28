import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";
import { ErrorBoundary } from "react-error-boundary";

export default function Layout({ children }: any) {
  return (
    <>
      <div className={styles.layout}>
        <Navbar />
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <div className={styles.contentContainer}>
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
}
