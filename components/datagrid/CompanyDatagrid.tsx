import {
  DataGridPro,
  GridColDef,
  GridValueGetterParams,
  GridEventListener,
} from "@mui/x-data-grid-pro";
import { CompaniesPageProps, CompanyInterface } from "../../types/companyTypes";
import { useRouter } from "next/router";

const columns: GridColDef[] = [
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
    ></DataGridPro>
  );
}

export default CompanyDatagrid;
