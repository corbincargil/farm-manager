import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import MenuItem from "@mui/material/MenuItem";
import { ChangeEvent, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const menuItemSx = {
  backgroundColor: "primary.light",
  "&:hover": { backgroundColor: "primary.dark" },
};

function Navbar({ mode, setMode }: any) {
  const router = useRouter();

  const handleThemeChange = (checked: boolean) => {
    checked ? setMode("dark") : setMode("light");
  };

  return (
    <div className={mode === "light" ? styles.navLight : styles.navDark}>
      <div>
        <Link href="/">
          <MenuItem className={styles.menuItem}>Farm Manager Logo</MenuItem>
        </Link>
        <Link href="/locations">
          <MenuItem
            className={
              router.asPath.includes("/locations") ? styles.menuItemSelected : styles.menuItem
            }
            sx={router.asPath.includes("/locations") ? menuItemSx : {}}
          >
            Locations
          </MenuItem>
        </Link>
        <Link href="/companies">
          <MenuItem
            className={
              router.asPath.includes("/companies") ? styles.menuItemSelected : styles.menuItem
            }
            sx={router.asPath.includes("/companies") ? menuItemSx : {}}
          >
            Companies
          </MenuItem>
        </Link>
        <Link href="/equipment">
          <MenuItem
            className={
              router.asPath.includes("/equipment") ? styles.menuItemSelected : styles.menuItem
            }
            sx={router.asPath.includes("/equipment") ? menuItemSx : {}}
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
