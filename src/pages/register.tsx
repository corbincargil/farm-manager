import { Typography } from "@mui/material";
import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";

//todo: use a different layout that doenst show the header or navbar
export default function Register() {
  return (
    <>
      <Typography variant="h5" color="primary.main">
        Register
      </Typography>
      <RegisterForm />
    </>
  );
}
