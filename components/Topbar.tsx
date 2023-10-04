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
import { useSession, signIn, signOut } from "next-auth/react";

function Topbar() {
  const { data: session } = useSession();
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
        {/* //todo: add name and theme preference to user model */}
        {/* //todo: update layout for register & login pages, update register and login page styling */}
        {/* //todo: update the way we are connecting to mongo, I don't think I need to connect every time I make a req */}
        {session && <MenuItem disableRipple>{session.user?.email}</MenuItem>}
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
