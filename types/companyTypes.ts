export interface CompanyInterface {
  _id: string;
  name: string;
  type: string | null;
  locations: string[] | null;
  main_address: {
    street_address: string;
    street_address2: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

export interface CompanyFormValues {
  name: string;
  locations: string[] | null;
  type: string | null;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  zip: string;
}

export interface CompaniesPageProps {
  companies: CompanyInterface[];
}

export interface ServerSideContext {
  params: {
    id: string;
  };
}

export interface CompanyDetailsPageProps {
  company: CompanyInterface;
}

export interface CompanyFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  formValues: CompanyFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<CompanyFormValues>>;
  //todo: fix the any below for handleSubmit
  handleSubmit: (e: any) => Promise<void>;
}

export const defaultCompanyFormValues: CompanyFormValues = {
  name: "",
  locations: null,
  type: null,
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  zip: "",
};

export const placeholderCompany: CompanyInterface = {
  _id: "",
  name: "",
  type: null,
  locations: null,
  main_address: {
    street_address: "",
    street_address2: "",
    city: "",
    state: "",
    zip_code: "",
  },
};
