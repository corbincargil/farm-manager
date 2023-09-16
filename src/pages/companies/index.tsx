import { useState } from "react";
import Link from "next/link";
// import LocationForm from "../../../components/forms/LocationForm";
import { connectToDatabase } from "../../../lib/mongodb";
import Company from "../../../models/Company";
import {
  CompaniesPageProps,
  CompanyInterface,
  CompanyFormValues,
  defaultCompanyFormValues,
} from "../../../types/companyTypes";

export default function Companies({ companies }: CompaniesPageProps) {
  const [formValues, setFormValues] = useState<CompanyFormValues>(
    defaultCompanyFormValues
  );

  //   const postLocation = async (body: any) => {
  //     return await fetch("/api/v1/locations", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     });
  //   };

  //   const handleSubmit = async () => {
  //     const body = {
  //       name: formValues.name,
  //       type: formValues.type,
  //       company: formValues.company,
  //       address: {
  //         street_address: formValues.streetAddress,
  //         street_address2: formValues.streetAddress2,
  //         city: formValues.city,
  //         state: formValues.state,
  //         zip_code: formValues.zip,
  //         longitude: formValues.longitude,
  //         latitude: formValues.latitude,
  //       },
  //     };
  //     await postLocation(body);
  //     setFormValues(defaultFormValues);
  //   };

  return (
    <>
      <h1>Companies</h1>
      <ul>
        {companies.map((c: CompanyInterface) => {
          return (
            <Link key={c.name} href={`/companies/${c._id}`}>
              <li key={c.name}>{c.name}</li>
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

const getCompanies = async () => {
  try {
    await connectToDatabase();
    const companies = await Company.find();
    return JSON.parse(JSON.stringify(companies));
  } catch (error) {
    console.log(error);
    return { message: "error fetching companies" };
  }
};

export const getServerSideProps = async () => {
  const companies = await getCompanies();
  return { props: { companies } };
};
