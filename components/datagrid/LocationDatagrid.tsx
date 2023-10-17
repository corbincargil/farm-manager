import { useEffect } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LocationInterface, LocationDataGridProps } from "../../types/locationTypes";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useColumns from "./useColumns";

function LocationDatagrid({ locations, onEdit }: LocationDataGridProps) {
  const columns = useColumns({ onEdit });
  const router = useRouter();

  return (
    <DataGridPro
      columns={columns}
      rows={locations}
      getRowId={(c: LocationInterface) => c._id}
      onRowClick={(c) => router.push(`/locations/${c.id}`)}
    />
  );
}

export default LocationDatagrid;
