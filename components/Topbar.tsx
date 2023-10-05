import Link from "next/link";
import styles from "@/styles/Topbar.module.css";
import { ReactPropTypes, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";
import { useSession, signIn } from "next-auth/react";
import SignOutModal from "./SignOutModal";

function Topbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const theme = useTheme();

  const handleClick = (e: React.SyntheticEvent) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setShowSignOut(false);
    setOpen(false);
  };

  return (
    <>
      <div
        className={theme.palette.mode === "light" ? styles.containerLight : styles.containerDark}
      >
        <Button className={styles.button} sx={{ color: "primary.dark" }}>
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
        {session && (
          <MenuItem disabled disableRipple>
            {session.user?.email}
          </MenuItem>
        )}
        {!session && (
          <MenuItem sx={{ color: "primary.main" }} onClick={() => signIn()}>
            Sign in
          </MenuItem>
        )}
        {session && (
          <MenuItem sx={{ color: "primary.main" }} onClick={() => setShowSignOut(true)}>
            Sign out
          </MenuItem>
        )}
      </Menu>
      <SignOutModal open={showSignOut} handleClose={handleClose} />
    </>
  );
}

export default Topbar;
