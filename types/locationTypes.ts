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
  company: { id: ObjectId; name: string };
  preferCoordinates: boolean;
}

export interface LocationsPageProps {
  locations: LocationInterface[];
}

export interface LocationDetailsPageProps {
  location: LocationInterface;
}

export interface LocationFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  formValues: LocationFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<LocationFormValues>>;
  formMode: "Add" | "Edit";
}

export interface LocationFormValues {
  name: string;
  companyName: string;
  companyId: ObjectId | string;
  type: string | null;
  streetAddress: string;
  streetAddress2: string;
  longitude: string;
  latitude: string;
  city: string;
  state: string;
  zip: string;
  preferCoordinates: boolean;
  _id: string | undefined;
}

export const defaultFormValues: LocationFormValues = {
  name: "",
  companyName: "",
  companyId: "",
  type: null,
  streetAddress: "",
  streetAddress2: "",
  longitude: "",
  latitude: "",
  city: "",
  state: "",
  zip: "",
  preferCoordinates: false,
  _id: undefined,
};

export interface LocationDataGridProps {
  locations: LocationInterface[];
  onEdit: any;
}
