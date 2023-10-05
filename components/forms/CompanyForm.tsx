import { useEffect, useState } from "react";
import { CompanyFormProps } from "../../types/companyTypes";
import styles from "../../src/styles/LocationForm.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import handleValidity from "../../utils/handleValidity";
import validator from "validator";
import { LocationInterface } from "../../types/locationTypes";
import Checkbox from "@mui/material/Checkbox";

//todo: test validation for the form
function CompanyForm(props: CompanyFormProps) {
  const { showForm, setShowForm, formValues, setFormValues, handleSubmit } = props;
  const [locationOptions, setLocationOptions] = useState<LocationInterface[]>([]);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [formValid, setFormValid] = useState<boolean>(false);

  const handleClose = () => setShowForm(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    const value = e.target.value;
    switch (field) {
      case "name":
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

  //todo: add filter for current company's locations
  useEffect(() => {
    fetch("/api/v1/locations")
      .then((res) => res.json())
      .then((data) => setLocationOptions(data.locations))
      .catch((err) => console.error("Error fetching locations", err));
  }, []);

  return (
    <Modal open={showForm} className={styles.modal} onClose={handleClose}>
      <Box className={styles.mainContainer} sx={{ backgroundColor: "background.paper" }}>
        <Typography variant="h4" color="primary">
          New Company
        </Typography>
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
              options={locationOptions}
              multiple
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.name}
                </li>
              )}
              getOptionLabel={(l: any) => l.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Locations"
                  error={invalidFields.includes("company")}
                />
              )}
              onChange={(e, newValue) => {
                handleValidity({
                  isValid: newValue.length > 0,
                  field: "location",
                  value: "this isnt used",
                  invalidFields,
                  setInvalidFields,
                  isRequired: false,
                });

                setFormValues({ ...formValues, locations: newValue.map((l) => l._id) });
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
          <Typography variant="h5" color="primary">
            Address:
          </Typography>
          <Box className={styles.innerContainer}>
            <TextField
              id="streetAddress"
              onChange={onChange}
              value={formValues.streetAddress}
              label="Street Address"
              className={styles.inputElement}
              required
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
              required
              error={invalidFields.includes("city")}
            />
            <TextField
              id="state"
              onChange={onChange}
              value={formValues.state}
              label="State"
              className={styles.inputElement}
              required
              error={invalidFields.includes("state")}
            />
            <TextField
              id="zip"
              onChange={onChange}
              value={formValues.zip}
              label="Zip Code"
              className={styles.inputElement}
              required
              error={invalidFields.includes("zip")}
            />
          </Box>
          <Button variant="contained" disabled={!formValid} type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default CompanyForm;
