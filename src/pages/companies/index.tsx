import { useState } from "react";
import styles from "../../styles/TablePage.module.css";
import CompanyForm from "../../../components/forms/CompanyForm";
import { connectToDatabase } from "../../../lib/mongodb";
import Company from "../../../models/Company";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CompanyDatagrid from "../../../components/datagrid/CompanyDatagrid";
import { ErrorBoundary } from "react-error-boundary";
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
  //todo: can we move this to the Company form?
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
    <Box className={styles.main}>
      <Box className={styles.titleContainer}>
        <Typography variant="h4" color="primary">
          Companies
        </Typography>
        <Button variant="contained" onClick={() => setShowForm((prev) => !prev)}>
          <Typography color="text.scondary">Add New Company</Typography>
        </Button>
      </Box>
      {showForm && (
        <CompanyForm
          showForm={showForm}
          setShowForm={setShowForm}
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
        />
      )}
      <ErrorBoundary fallback={<div>Failed to load CompanyDatagrid</div>}>
        <Box className={styles.datagridContainer}>
          <CompanyDatagrid companies={companies} />
        </Box>
      </ErrorBoundary>
    </Box>
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
