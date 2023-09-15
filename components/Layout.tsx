import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";

export default function Layout({ children }: any) {
  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
