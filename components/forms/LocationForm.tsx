import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Button, Typography } from "@mui/material";
import { LocationFormProps } from "../../types/locationTypes";
import styles from "./LocationForm.module.css";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { CompanyInterface, placeholderCompany } from "../../types/companyTypes";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

function LocationForm(props: LocationFormProps) {
  const { formValues, setFormValues, handleSubmit } = props;
  const [companyOptions, setCompanyOptions] = useState<CompanyInterface[]>([
    placeholderCompany,
  ]);
  const [useCoordinates, setUseCoordinates] = useState<boolean>(false);

  const handleCoordinateToggle = (e: any) => {
    const checked = e.target.checked;
    checked ? setUseCoordinates(true) : setUseCoordinates(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    const value = e.target.value;
    setFormValues({ ...formValues, [field]: value });
  };

  useEffect(() => {
    fetch("/api/v1/companies")
      .then((res) => res.json())
      .then((data) => setCompanyOptions(data.companies))
      .catch((err) => console.error("Error fetching companies", err));
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Typography variant="h4">New Location</Typography>
      <FormControl component="form" className={styles.inputContainer}>
        <Box className={styles.innerContainer}>
          <TextField
            id="name"
            sx={{ width: "100%" }}
            onChange={onChange}
            value={formValues.name}
            label="Name"
            className={styles.inputElement}
          />
          <Autocomplete
            id="company"
            options={companyOptions}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Company" />}
            onChange={(e, newValue) =>
              setFormValues({ ...formValues, company: newValue?._id || "" })
            }
            className={styles.inputElement}
          />
          <Autocomplete
            id="type"
            value={formValues.type}
            options={["Farm", "Office", "Store"]}
            renderInput={(params) => <TextField {...params} label="Type" />}
            onChange={(e, newValue) =>
              setFormValues({ ...formValues, type: newValue || "" })
            }
            className={styles.inputElement}
          />
        </Box>
        <Typography variant="h5">Address:</Typography>
        <FormControlLabel
          control={<Switch onChange={handleCoordinateToggle} />}
          label="Use coordinates"
        />
        {useCoordinates ? (
          <Box className={styles.innerContainer}>
            <TextField
              id="longitude"
              onChange={onChange}
              value={formValues.longitude}
              label="Longitude"
              className={styles.inputElement}
            />
            <TextField
              id="latitude"
              onChange={onChange}
              value={formValues.latitude}
              label="Latitude"
              className={styles.inputElement}
            />
          </Box>
        ) : (
          <>
            <Box className={styles.innerContainer}>
              <TextField
                id="streetAddress"
                onChange={onChange}
                value={formValues.streetAddress}
                label="Street Address"
                className={styles.inputElement}
              />
              <TextField
                id="streetAddress2"
                onChange={onChange}
                value={formValues.streetAddress2}
                label="Street Address 2"
                className={styles.inputElement}
              />
              <TextField
                id="city"
                onChange={onChange}
                value={formValues.city}
                label="City"
                className={styles.inputElement}
              />
              <TextField
                id="state"
                onChange={onChange}
                value={formValues.state}
                label="State"
                className={styles.inputElement}
              />
              <TextField
                id="zip"
                onChange={onChange}
                value={formValues.zip}
                label="Zip Code"
                className={styles.inputElement}
              />
            </Box>
          </>
        )}
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>
    </div>
  );
}

export default LocationForm;
