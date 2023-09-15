import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

interface FormValues {
  name: string;
  company: string;
  type: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  zip: string;
}

const defaultFormValues: FormValues = {
  name: "",
  company: "",
  type: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  zip: "",
};

export default function Locations() {
  const [locations, setLocations] = useState<any>([]);
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);

  const getLocations = async () => {
    try {
      return await axios.get("/api/v1/locations");
    } catch (error) {
      console.log(error);
    }
  };

  const postLocation = async (body: any) => {
    try {
      return await axios.post("/api/v1/locations", body);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    const value = e.target.value;
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSubmit = async () => {
    const body = {
      name: formValues.name,
      type: formValues.type,
      address: {
        street_address: formValues.streetAddress,
        street_address2: formValues.streetAddress2,
        city: formValues.city,
        state: formValues.state,
        zip_code: formValues.zip,
      },
      company: formValues.company,
    };
    console.log("🚀 ~ file: index.tsx:69 ~ handleSubmit ~ body:", body);
    await postLocation(body);
    setFormValues(defaultFormValues);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLocations();
      if (!response || response.status !== 200)
        throw new Error("Error getting locations");
      console.log(response);
      setLocations(response.data?.locations);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <>
      <h1>Location page</h1>
      <ul>
        {locations.map((l: any) => {
          return <li key={l.name}>{l.name}</li>;
        })}
      </ul>
      <h2>New Location:</h2>
      <FormControl component="form">
        <TextField
          id="name"
          onChange={onChange}
          value={formValues.name}
          label="Name"
        />
        <TextField
          id="company"
          onChange={onChange}
          value={formValues.company}
          label="Company"
        />
        <Select
          id="type"
          sx={{ width: "100px" }}
          value={formValues.type}
          label="Location Type"
          onChange={(e: SelectChangeEvent) => {
            setFormValues({ ...formValues, type: e.target.value });
          }}
        >
          <MenuItem value="Farm">Farm</MenuItem>
          <MenuItem value="Office">Office</MenuItem>
          <MenuItem value="Store">Store</MenuItem>
        </Select>
        <Typography>Address:</Typography>
        <TextField
          id="streetAddress"
          onChange={onChange}
          value={formValues.streetAddress}
          label="Street Address"
        />
        <TextField
          id="streetAddress2"
          onChange={onChange}
          value={formValues.streetAddress2}
          label="Street Address 2"
        />
        <TextField
          id="city"
          onChange={onChange}
          value={formValues.city}
          label="City"
        />
        <TextField
          id="state"
          onChange={onChange}
          value={formValues.state}
          label="State"
        />
        <TextField
          id="zip"
          onChange={onChange}
          value={formValues.zip}
          label="Zip Code"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormControl>
    </>
  );
}
