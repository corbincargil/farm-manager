import { DataGridPro, GridColDef, GridRowParams, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { CompaniesPageProps, CompanyInterface } from "../../types/companyTypes";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    disableReorder: true,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        onClick={() => console.log("item edited")}
        label="Edit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        onClick={() => console.log("item edited")}
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
  //   {
  //     field: "locations",
  //     headerName: "Locations",
  //     type: "array",
  //     width: 200,
  //     editable: false,
  //     valueGetter: (c: any) => c.map(c.name),
  //   },
];

function CompanyDatagrid({ companies }: CompaniesPageProps) {
  const router = useRouter();
  return (
    <DataGridPro
      columns={columns}
      rows={companies}
      getRowId={(c: CompanyInterface) => c._id}
      onRowClick={(c) => router.push(`/companies/${c.id}`)}
      // sx={styles}
    ></DataGridPro>
  );
}

export default CompanyDatagrid;
