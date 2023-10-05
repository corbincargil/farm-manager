import Modal from "@mui/material/Modal";
import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import styles from "../src/styles/SignOutModel.module.css";

function SignOutModal({ open, handleClose }: any) {
  return (
    <Modal
      sx={{ backgroundColor: "secondary.dark" }}
      className={styles.modal}
      open={open}
      onClose={handleClose}
    >
      <>
        <Typography variant="h5" color="primary">
          Sign out?
        </Typography>
        <div className={styles.buttonContainer}>
          <Button variant="contained" onClick={() => signOut()}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={() => handleClose()}>
            Cancel
          </Button>
        </div>
      </>
    </Modal>
  );
}

export default SignOutModal;
