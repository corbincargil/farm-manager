import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid-pro";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function useColumns({ onEdit }: { onEdit: (p: any) => void }) {
  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      disableReorder: true,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<EditIcon />} onClick={() => onEdit(params.row)} label="Edit" />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={(e) => console.log("item deleted", params)}
          label="Delete"
        />,
      ],
    },
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      editable: false,
    },
    {
      field: "company",
      headerName: "Company",
      type: "string",
      width: 200,
      editable: false,
      valueGetter: (l: GridValueGetterParams) => {
        return l.row.company?.name || "";
      },
    },
  ];
  return columns;
}

export default useColumns;
