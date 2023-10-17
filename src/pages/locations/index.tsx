import { useEffect, useState } from "react";
import styles from "../../styles/TablePage.module.css";
import LocationForm from "../../../components/forms/LocationForm";
import Button from "@mui/material/Button";
import { connectToDatabase } from "../../../lib/mongodb";
import Location from "../../../models/Location";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  LocationInterface,
  LocationsPageProps,
  defaultFormValues,
  LocationFormValues,
} from "../../../types/locationTypes";
import { useSession, signIn, signOut } from "next-auth/react";
import LocationDatagrid from "../../../components/datagrid/LocationDatagrid";
import { ObjectId } from "mongodb";

export default function Locations({ locations }: LocationsPageProps) {
  const { data: session } = useSession();
  const [formValues, setFormValues] = useState<LocationFormValues>(defaultFormValues);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"Add" | "Edit">("Add");
  //todo: add formMode state
  //todo: export all form logic into the form component or some HOC/hook

  const handleEdit = (row: LocationInterface) => {
    console.log("🚀 ~ file: index.tsx:26 ~ handleEdit ~ row:", row);
    const { _id, company, address, type, name, preferCoordinates } = row;
    setFormMode("Edit");
    setFormValues({
      ...formValues,
      _id,
      companyName: company.name,
      companyId: company.id,
      latitude: address.latitude,
      longitude: address.longitude,
      streetAddress: address.street_address,
      streetAddress2: address.street_address2,
      city: address.city,
      state: address.state,
      zip: address.zip_code,
      type,
      name,
      preferCoordinates,
    });
    setShowForm(true);
  };

  useEffect(() => {
    console.log("formValues", formValues);
  }, [formValues]);

  if (session) {
    return (
      <Box className={styles.main}>
        <Box className={styles.titleContainer}>
          <Typography variant="h4" color="primary">
            Locations
          </Typography>
          <Button variant="contained" onClick={() => setShowForm((prev) => !prev)}>
            <Typography color="text.scondary">Add New Location</Typography>
          </Button>
        </Box>
        <Box className={styles.datagridContainer}>
          <LocationDatagrid locations={locations} onEdit={handleEdit} />
        </Box>
        {showForm && (
          <LocationForm
            showForm={showForm}
            setShowForm={setShowForm}
            formValues={formValues}
            setFormValues={setFormValues}
            formMode={formMode}
          />
        )}
      </Box>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

const getLocations = async () => {
  try {
    await connectToDatabase();
    const locations = await Location.find();
    return JSON.parse(JSON.stringify(locations));
  } catch (error) {
    console.log(error);
    return { message: "error fetching locations" };
  }
};

export const getServerSideProps = async () => {
  const locations = await getLocations();
  return { props: { locations } };
};
