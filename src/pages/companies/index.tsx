import { useState } from "react";
import Link from "next/link";
import CompanyForm from "../../../components/forms/CompanyForm";
import { connectToDatabase } from "../../../lib/mongodb";
import Company from "../../../models/Company";
import Button from "@mui/material/Button";
import {
  CompaniesPageProps,
  CompanyInterface,
  CompanyFormValues,
  defaultCompanyFormValues,
} from "../../../types/companyTypes";

export default function Companies({ companies }: CompaniesPageProps) {
  const [formValues, setFormValues] = useState<CompanyFormValues>(defaultCompanyFormValues);
  const [showForm, setShowForm] = useState(false);

  const postCompany = async (body: any) => {
    return await fetch("/api/v1/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      name: formValues.name,
      type: formValues.type,
      locations: formValues.locations,
      address: {
        street_address: formValues.streetAddress,
        street_address2: formValues.streetAddress2,
        city: formValues.city,
        state: formValues.state,
        zip_code: formValues.zip,
      },
    };
    await postCompany(body);
    setFormValues(defaultCompanyFormValues);
  };

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
      <Button variant="contained" onClick={() => setShowForm((prev) => !prev)}>
        Add New Company
      </Button>
      <CompanyForm
        showForm={showForm}
        setShowForm={setShowForm}
        formValues={formValues}
        setFormValues={setFormValues}
        handleSubmit={handleSubmit}
      />
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
