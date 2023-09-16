import { useRouter } from "next/router";
import Company from "../../../models/Company";
import { connectToDatabase } from "../../../lib/mongodb";
import {
  CompanyDetailsPageProps,
  ServerSideContext,
} from "../../../types/companyTypes";

export default function LocationDetails({ company }: CompanyDetailsPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      <li>Company Name: {company?.name || ""}</li>
      <li>Company Type: {company?.type || ""}</li>
      <li>
        Company Address:{" "}
        <ul>
          <li>{`${company?.main_address?.street_address}` || ""}</li>
          {company?.main_address?.street_address2 && (
            <li>{`${company?.main_address?.street_address2}`}</li>
          )}
          <li>{`${company?.main_address?.city}` || ""}</li>
          <li>{`${company?.main_address?.state}` || ""}</li>
          <li>{`${company?.main_address?.zip_code}` || ""}</li>
        </ul>
      </li>
    </ul>
  );
}

const getCompany = async (context: ServerSideContext) => {
  const { id } = context.params;
  try {
    await connectToDatabase();
    const company = await Company.findById(id);
    return JSON.parse(JSON.stringify(company));
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps = async (context: ServerSideContext) => {
  const company = await getCompany(context);
  return { props: { company } };
};
