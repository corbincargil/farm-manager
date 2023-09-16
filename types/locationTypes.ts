import { ObjectId } from "mongodb";

export interface LocationInterface {
  address: {
    street_address: string;
    street_address2: string;
    city: string;
    state: string;
    zip_code: string;
    longitude: string;
    latitude: string;
  };
  _id: string;
  name: string;
  type: string;
  company: ObjectId;
}

export interface LocationsPageProps {
  locations: LocationInterface[];
}

export interface LocationDetailsPageProps {
  location: LocationInterface;
}

export interface LocationFormProps {
  formValues: LocationFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<LocationFormValues>>;
  handleSubmit: () => Promise<void>;
}

export interface LocationFormValues {
  name: string;
  company: string;
  type: string | null;
  streetAddress: string;
  streetAddress2: string;
  longitude: string;
  latitude: string;
  city: string;
  state: string;
  zip: string;
}

export const defaultFormValues: LocationFormValues = {
  name: "",
  company: "",
  type: null,
  streetAddress: "",
  streetAddress2: "",
  longitude: "",
  latitude: "",
  city: "",
  state: "",
  zip: "",
};
