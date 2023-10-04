import { useRouter } from "next/router";
import Equipment from "../../../models/Equipment";
import { connectToDatabase } from "../../../mongodb";
import { EquipmentDetailsPageProps, ServerSideContext } from "../../../types/equipmentTypes";

export default function EquipmentDetails({ equipment }: EquipmentDetailsPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      <li>Company Name: {equipment?.name || ""}</li>
      <li>Company Type: {equipment?.type || ""}</li>
      <li>Company Serial Number: {equipment?.serialNumber || ""}</li>
    </ul>
  );
}

const getEquipment = async (context: ServerSideContext) => {
  const { id } = context.params;
  try {
    await connectToDatabase();
    const equipment = await Equipment.findById(id);
    return JSON.parse(JSON.stringify(equipment));
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps = async (context: ServerSideContext) => {
  const equipment = await getEquipment(context);
  return { props: { equipment } };
};
