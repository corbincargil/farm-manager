import { useState } from "react";
import Link from "next/link";
import CompanyForm from "../../../components/forms/CompanyForm";
import { connectToDatabase } from "../../../lib/mongodb";
import Company from "../../../models/Company";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
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

  //todo: add toast success/errors
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const body = {
      name: formValues.name,
      type: formValues.type,
      locations: formValues.locations,
      main_address: {
        street_address: formValues.streetAddress,
        street_address2: formValues.streetAddress2,
        city: formValues.city,
        state: formValues.state,
        zip_code: formValues.zip,
      },
    };
    await postCompany(body);
    setFormValues(defaultCompanyFormValues);
    setShowForm(false);
  };

  return (
    <>
      <Typography variant="h4" color="primary">
        Companies
      </Typography>
      <List>
        {companies.map((c: CompanyInterface) => {
          return (
            <Link key={c.name} href={`/companies/${c._id}`}>
              <ListItemText key={c.name}>{c.name}</ListItemText>
            </Link>
          );
        })}
      </List>
      <Button variant="contained" onClick={() => setShowForm((prev) => !prev)}>
        Add New Company
      </Button>
      {showForm && (
        <CompanyForm
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
