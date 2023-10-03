import { useState } from "react";
import Link from "next/link";
import LocationForm from "../../../components/forms/LocationForm";
import Button from "@mui/material/Button";
import { connectToDatabase } from "../../../lib/mongodb";
import Location from "../../../models/Location";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {
  LocationInterface,
  LocationFormValues,
  LocationsPageProps,
  defaultFormValues,
} from "../../../types/locationTypes";

export default function Locations({ locations }: LocationsPageProps) {
  const [formValues, setFormValues] = useState<LocationFormValues>(defaultFormValues);
  const [showForm, setShowForm] = useState(false);

  const postLocation = async (body: any) => {
    return await fetch("/api/v1/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  //todo: add toast success/errors
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const body = {
      name: formValues.name,
      type: formValues.type,
      company: formValues.company,
      address: {
        street_address: formValues.streetAddress,
        street_address2: formValues.streetAddress2,
        city: formValues.city,
        state: formValues.state,
        zip_code: formValues.zip,
        longitude: formValues.longitude,
        latitude: formValues.latitude,
      },
    };
    await postLocation(body);
    setFormValues(defaultFormValues);
    setShowForm(false);
  };

  return (
    <>
      <Typography variant="h4" color="primary">
        Locations
      </Typography>
      <List>
        {locations.map((l: LocationInterface) => {
          return (
            <Link key={l.name} href={`/locations/${l._id}`}>
              <Typography color="text.primary" key={l.name}>
                {l.name}
              </Typography>
            </Link>
          );
        })}
      </List>
      <Button variant="contained" onClick={() => setShowForm((prev) => !prev)}>
        <Typography color="text.scondary">Add New Location</Typography>
      </Button>
      {showForm && (
        <LocationForm
          showForm={showForm}
          setShowForm={setShowForm}
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
        />
      )}
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
