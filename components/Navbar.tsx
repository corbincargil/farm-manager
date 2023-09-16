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
      <li>
        <Link href="/companies">Companies</Link>
      </li>
    </ul>
  );
}

export default Navbar;
