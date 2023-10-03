import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import MenuItem from "@mui/material/MenuItem";
import { ChangeEvent, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/router";

function Navbar({ mode, setMode }: any) {
  const router = useRouter();

  const handleThemeChange = (checked: boolean) => {
    checked ? setMode("dark") : setMode("light");
  };

  return (
    <div className={styles.nav}>
      <div>
        <Link href="/">
          <MenuItem className={styles.menuItem}>Farm Manager</MenuItem>
        </Link>
        <Link href="/locations">
          <MenuItem
            className={styles.menuItem}
            sx={router.asPath.includes("/locations") ? { backgroundColor: "primary.light" } : {}}
          >
            Locations
          </MenuItem>
        </Link>
        <Link href="/companies">
          <MenuItem
            className={styles.menuItem}
            sx={router.asPath.includes("/companies") ? { backgroundColor: "primary.light" } : {}}
          >
            Companies
          </MenuItem>
        </Link>
        <Link href="/equipment">
          <MenuItem
            className={styles.menuItem}
            sx={router.asPath.includes("/equipment") ? { backgroundColor: "primary.light" } : {}}
          >
            Equipment
          </MenuItem>
        </Link>
      </div>
      <MenuItem disableRipple sx={{ justifyContent: "center" }}>
        <LightModeIcon color={mode === "light" ? "primary" : "disabled"} />
        <Switch
          checked={mode === "light" ? false : true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleThemeChange(e.target.checked)}
        />
        <DarkModeIcon color={mode === "dark" ? "primary" : "disabled"} />
      </MenuItem>
    </div>
  );
}

export default Navbar;
