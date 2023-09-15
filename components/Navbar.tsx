import Link from "next/link";
import styles from "@/styles/Navbar.module.css";

function Navbar() {
  return (
    <ul className={styles.nav}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/locations">Locations</Link>
      </li>
      {/* <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li> */}
    </ul>
  );
}

export default Navbar;