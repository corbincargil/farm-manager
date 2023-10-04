import { useEffect, useState } from "react";
import styles from "../../src/styles/LocationForm.module.css";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import handleValidity from "../../utils/handleValidity";
import validator from "validator";
import { useRouter } from "next/router";
import User from "../../models/User";
import { connectToDatabase } from "../../lib/mongodb";

const defaultRegistrationData = {
  email: "",
  password: "",
};

export default function RegisterForm() {
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [data, setData] = useState(defaultRegistrationData);

  const router = useRouter();

  const sendRegistrationRequest = async (body: any) => {
    return await fetch("/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

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
      case "password":
        handleValidity({
          isValid: validator.isStrongPassword(value),
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
    const body = {
      email: data.email,
      password: data.password,
    };
    const result = await sendRegistrationRequest(body);
    console.log(
      "🚀 ~ file: RegisterForm.tsx:69 ~ consthandleSubmit:React.FormEventHandler<HTMLFormElement>= ~ result:",
      result
    );
    // if (result) {
    //   setData(defaultRegistrationData);
    //   router.push("/login");
    // }
  };

  useEffect(() => {
    invalidFields.length ? setFormValid(false) : setFormValid(true);
  }, [invalidFields]);

  useEffect(() => {
    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Error fetching companies", err));
  }, []);

  return (
    <Box className={styles.mainContainer} sx={{ backgroundColor: "background.paper" }}>
      <Typography variant="h4" color="primary">
        Register
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
