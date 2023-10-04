import { useEffect, useState } from "react";
import styles from "../../src/styles/LocationForm.module.css";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import handleValidity from "../../utils/handleValidity";
import validator from "validator";
import { signIn } from "next-auth/react";
import { Router, useRouter } from "next/router";

const defaultLoginData = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [data, setData] = useState(defaultLoginData);

  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    const value = e.target.value;

    switch (field) {
      case "email":
        handleValidity({
          isValid: validator.isEmail(value.trim()),
          field,
          value,
          invalidFields,
          setInvalidFields,
        });
        break;
      default:
        break;
    }
    setData({ ...data, [field]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log({ ...data, redirect: false });
    signIn("credentials", { ...data, redirect: false });
    router.push("/");
  };

  useEffect(() => {
    invalidFields.length ? setFormValid(false) : setFormValid(true);
  }, [invalidFields]);

  return (
    <Box className={styles.mainContainer} sx={{ backgroundColor: "background.paper" }}>
      <Typography variant="h4" color="primary">
        Login
      </Typography>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <Box className={styles.innerContainer}>
          <TextField
            id="email"
            sx={{ width: "100%" }}
            onChange={onChange}
            value={data.email}
            label="Email"
            className={styles.inputElement}
            required
            error={invalidFields.includes("email")}
          />
          <TextField
            id="password"
            onChange={onChange}
            value={data.password}
            label="Password"
            className={styles.inputElement}
            required
            error={invalidFields.includes("password")}
            type="password"
          />
        </Box>

        <Button variant="contained" disabled={!formValid} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}
