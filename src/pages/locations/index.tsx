import { useState } from "react";
import Link from "next/link";
import LocationForm from "../../../components/forms/LocationForm";
import { connectToDatabase } from "../../../lib/mongodb";
import Location from "../../../models/Location";
import {
  LocationInterface,
  LocationFormValues,
  LocationsPageProps,
  defaultFormValues,
} from "../../../types/locationTypes";

export default function Locations({ locations }: LocationsPageProps) {
  const [formValues, setFormValues] =
    useState<LocationFormValues>(defaultFormValues);

  const postLocation = async (body: any) => {
    return await fetch("/api/v1/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const handleSubmit = async () => {
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
  };

  return (
    <>
      <h1>Locations</h1>
      <ul>
        {locations.map((l: LocationInterface) => {
          return (
            <Link key={l.name} href={`/locations/${l._id}`}>
              <li key={l.name}>{l.name}</li>
            </Link>
          );
        })}
      </ul>
      <LocationForm
        formValues={formValues}
        setFormValues={setFormValues}
        handleSubmit={handleSubmit}
      />
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
