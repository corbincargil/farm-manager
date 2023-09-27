import { useEffect, useState } from "react";
import { LocationFormProps } from "../../types/locationTypes";
import { CompanyInterface, placeholderCompany } from "../../types/companyTypes";
import styles from "./LocationForm.module.css";
import { Box } from "@mui/material";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import handleValidity from "../../utils/handleValidity";
import validator from "validator";

function LocationForm(props: LocationFormProps) {
  const { showForm, setShowForm, formValues, setFormValues, handleSubmit } =
    props;
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [companyOptions, setCompanyOptions] = useState<CompanyInterface[]>([
    placeholderCompany,
  ]);
  const [useCoordinates, setUseCoordinates] = useState<boolean>(false);

  const handleClose = () => setShowForm(false);

  const handleCoordinateToggle = (e: any) => {
    const checked = e.target.checked;
    checked ? setUseCoordinates(true) : setUseCoordinates(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    const value = e.target.value;
    switch (field) {
      case "name":
      case "company":
      case "streetAddress":
      case "city":
      case "state":
        handleValidity({
          isValid: !validator.isEmpty(value.trim()),
          field,
          value,
          invalidFields,
          setInvalidFields,
        });
        break;
      case "zip":
        handleValidity({
          isValid: validator.isPostalCode(value, "any"),
          field,
          value,
          invalidFields,
          setInvalidFields,
        });
        break;

      default:
        break;
    }
    setFormValues({ ...formValues, [field]: value });
  };

  useEffect(() => {
    invalidFields.length ? setFormValid(false) : setFormValid(true);
  }, [invalidFields]);

  useEffect(() => {
    fetch("/api/v1/companies")
      .then((res) => res.json())
      .then((data) => setCompanyOptions(data.companies))
      .catch((err) => console.error("Error fetching companies", err));
  }, []);

  return (
    <Modal open={showForm} className={styles.modal} onClose={handleClose}>
      <div className={styles.mainContainer}>
        <Typography variant="h4">New Location</Typography>
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
          <Box className={styles.innerContainer}>
            <TextField
              id="name"
              sx={{ width: "100%" }}
              onChange={onChange}
              value={formValues.name}
              label="Name"
              className={styles.inputElement}
              required
              error={invalidFields.includes("name")}
            />
            <Autocomplete
              id="company"
              options={companyOptions}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company"
                  required
                  error={invalidFields.includes("company")}
                />
              )}
              onChange={(e, newValue) => {
                handleValidity({
                  isValid: !validator.isEmpty(newValue?._id.trim() || ""),
                  field: "company",
                  value: newValue?._id || "",
                  invalidFields,
                  setInvalidFields,
                });
                setFormValues({ ...formValues, company: newValue?._id || "" });
              }}
              className={styles.inputElement}
            />
            <Autocomplete
              id="type"
              value={formValues.type}
              options={["Farm", "Office", "Store"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type"
                  required
                  error={invalidFields.includes("type")}
                />
              )}
              onChange={(e, newValue) => {
                handleValidity({
                  isValid: !validator.isEmpty(newValue?.trim() || ""),
                  field: "type",
                  value: newValue || "",
                  invalidFields,
                  setInvalidFields,
                });
                setFormValues({ ...formValues, type: newValue || "" });
              }}
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
                required={useCoordinates ? true : false}
              />
              <TextField
                id="latitude"
                onChange={onChange}
                value={formValues.latitude}
                label="Latitude"
                className={styles.inputElement}
                required={useCoordinates ? true : false}
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
                  required={!useCoordinates ? true : false}
                  error={invalidFields.includes("streetAddress")}
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
                  required={!useCoordinates ? true : false}
                  error={invalidFields.includes("city")}
                />
                <TextField
                  id="state"
                  onChange={onChange}
                  value={formValues.state}
                  label="State"
                  className={styles.inputElement}
                  required={!useCoordinates ? true : false}
                  error={invalidFields.includes("state")}
                />
                <TextField
                  id="zip"
                  onChange={onChange}
                  value={formValues.zip}
                  label="Zip Code"
                  className={styles.inputElement}
                  required={!useCoordinates ? true : false}
                  error={invalidFields.includes("zip")}
                />
              </Box>
            </>
          )}
          <Button variant="contained" disabled={!formValid} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default LocationForm;
