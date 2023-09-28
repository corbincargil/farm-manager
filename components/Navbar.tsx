import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

function Navbar() {
  const [selected, setSelected] = useState<string>("");

  const handleSelection = (newSelection: string) => {
    setSelected(newSelection);
  };

  //todo: figure out a better way to determine which nav link is active... might be better to not use the MenuItem component.
  return (
    <ul className={styles.nav}>
      <Link href="/">
        <MenuItem
          selected={selected === "home"}
          onClick={() => handleSelection("home")}
          className={styles.menuItem}
        >
          Home
        </MenuItem>
      </Link>
      <Link href="/locations">
        <MenuItem
          // selected={selected === "locations"}
          onClick={() => handleSelection("locations")}
          className={selected === "locations" ? styles.menuItemSelected : styles.menuItem}
        >
          Locations
        </MenuItem>
      </Link>
      <Link href="/companies">
        <MenuItem
          selected={selected === "companies"}
          onClick={() => handleSelection("companies")}
          className={styles.menuItem}
          sx={{ "&.Mui-selected": { backgroundColor: "action.active" } }}
        >
          Companies
        </MenuItem>
      </Link>
      <Link href="/equipment">
        <MenuItem
          selected={selected === "equipment"}
          onClick={() => handleSelection("equipment")}
          className={styles.menuItem}
        >
          Equipment
        </MenuItem>
      </Link>
    </ul>
  );
}

export default Navbar;
