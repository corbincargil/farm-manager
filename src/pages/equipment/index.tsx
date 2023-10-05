import { useState } from "react";
import Link from "next/link";
import { connectToDatabase } from "../../../lib/mongodb";
import Equipment from "../../../models/Equipment";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
// import {
//   LocationInterface,
//   LocationFormValues,
//   LocationsPageProps,
//   defaultFormValues,
// } from "../../../types/locationTypes";

export default function EquipmentPage({ equipment }: any) {
  //   const [formValues, setFormValues] =
  //     useState<LocationFormValues>(defaultFormValues);

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
    // const body = {
    //   name: formValues.name,
    //   type: formValues.type,
    //   company: formValues.company,
    //   address: {
    //     street_address: formValues.streetAddress,
    //     street_address2: formValues.streetAddress2,
    //     city: formValues.city,
    //     state: formValues.state,
    //     zip_code: formValues.zip,
    //     longitude: formValues.longitude,
    //     latitude: formValues.latitude,
    //   },
    // };
    // await postLocation(body);
    // setFormValues(defaultFormValues);
  };

  return (
    <>
      <Typography variant="h4" color="primary">
        Equipment
      </Typography>
      <List>
        {equipment.map((e: any) => {
          return (
            <Link key={e.serialNumber} href={`/equipment/${e._id}`}>
              <Typography color="text.primary" key={e.serialNumber}>
                {`${e.type} - ${e.serialNumber}`}
              </Typography>
            </Link>
          );
        })}
      </List>
      {/* <LocationForm
        formValues={formValues}
        setFormValues={setFormValues}
        handleSubmit={handleSubmit}
      /> */}
    </>
  );
}

const getEquipment = async () => {
  try {
    await connectToDatabase();
    const equipment = await Equipment.find();
    return JSON.parse(JSON.stringify(equipment));
  } catch (error) {
    console.log(error);
    return { message: "error fetching equipment" };
  }
};

export const getServerSideProps = async () => {
  const equipment = await getEquipment();
  return { props: { equipment } };
};
