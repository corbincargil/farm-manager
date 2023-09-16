import { useRouter } from "next/router";
import Location from "../../../models/Location";
import { connectToDatabase } from "../../../lib/mongodb";
import { LocationDetailsPageProps } from "../../../types/locationTypes";
interface ServerSideContext {
  params: {
    id: string;
  };
}

export default function LocationDetails({
  location,
}: LocationDetailsPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      <li>Location Name: {location?.name || ""}</li>
      <li>Location Type: {location?.type || ""}</li>
      <li>
        Location Address:{" "}
        <ul>
          <li>{`${location?.address?.street_address}` || ""}</li>
          {location?.address?.street_address2 && (
            <li>{`${location?.address?.street_address2}`}</li>
          )}
          <li>{`${location?.address?.city}` || ""}</li>
          <li>{`${location?.address?.state}` || ""}</li>
          <li>{`${location?.address?.zip_code}` || ""}</li>
          <li>{`${location?.address?.longitude}` || ""}</li>
          <li>{`${location?.address?.latitude}` || ""}</li>
        </ul>
      </li>
    </ul>
  );
}

const getLocation = async (context: ServerSideContext) => {
  const { id } = context.params;
  try {
    await connectToDatabase();
    const location = await Location.findById(id);
    return JSON.parse(JSON.stringify(location));
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps = async (context: ServerSideContext) => {
  const location = await getLocation(context);
  return { props: { location } };
};
