export interface EquipmentInterface {
  _id: string;
  name: string;
  type: string | null;
  currentLocation: string;
  owner: string;
  isRental: boolean;
  currentRenter: string;
  serialNumber: string;
}

export interface EquipmentPageProps {
  equipment: EquipmentInterface[];
}

export interface EquipmentDetailsPageProps {
  equipment: EquipmentInterface;
}

export interface ServerSideContext {
  params: {
    id: string;
  };
}
