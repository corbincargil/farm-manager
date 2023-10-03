import Link from "next/link";
import styles from "@/styles/Topbar.module.css";
import { ReactPropTypes, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";

function Topbar() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (e: React.SyntheticEvent) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <div className={styles.container}>
        <Button className={styles.button}>
          <MenuIcon fontSize="large" />
        </Button>
        <Button className={styles.button} sx={{ color: "primary.dark" }} onClick={handleClick}>
          <AccountCircleIcon fontSize="large" />
        </Button>
      </div>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setOpen(false)} disablePortal>
        <MenuItem disableRipple>
          <LightModeIcon />
          <Switch />
          <DarkModeIcon />
        </MenuItem>
      </Menu>
    </>
  );
}

export default Topbar;
