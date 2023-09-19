import { useState } from "react";
import Link from "next/link";
import { connectToDatabase } from "../../../lib/mongodb";
import Equipment from "../../../models/Equipment";
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
      <h1>Equipment</h1>
      <ul>
        {equipment.map((l: any) => {
          return (
            <Link key={l.serialNumber} href={`/equipment/${l._id}`}>
              <li key={l.serialNumber}>{`${l.type} - ${l.serialNumber}`}</li>
            </Link>
          );
        })}
      </ul>
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
