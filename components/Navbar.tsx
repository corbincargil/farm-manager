import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import MenuItem from "@mui/material/MenuItem";
import { ChangeEvent, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";

function Navbar({ mode, setMode }: any) {
  const [selected, setSelected] = useState<string>("");

  const handleSelection = (newSelection: string) => {
    setSelected(newSelection);
  };

  const handleThemeChange = (checked: boolean) => {
    checked ? setMode("dark") : setMode("light");
  };

  //todo: figure out a better way to determine which nav link is active... might be better to not use the MenuItem component.
  return (
    <div className={styles.nav}>
      <div>
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
