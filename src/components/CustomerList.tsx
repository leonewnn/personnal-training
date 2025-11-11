import { useEffect, useState } from "react";
import type { Customer } from "../types";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { fetchCustomers } from "../cutsomerapi";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import AddTraining from "./AddTraining";

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "Action",
      width: 120,
      sortable: false,
      disableExport: true,
      renderCell: (params) => (
        <>
          <EditCustomer getCustomers={getCustomers} customerRow={params.row} />
          <DeleteCustomer getCustomers={getCustomers} customerRow={params.row} />
        </>
      )
    },
     {
      field: "training",
      headerName: "Training",
      width: 150,
      sortable: false,
      disableExport: true,
      renderCell: (params) => (
        <AddTraining customer={params.row} onSuccess={getCustomers} />
      )
    },
    { field: "firstname", headerName: "First name", width: 150, sortable: true },
    { field: "lastname", headerName: "Last name", width: 150, sortable: true },
    { field: "email", headerName: "Email", width: 220, sortable: true },
    { field: "phone", headerName: "Phone", width: 150, sortable: true },
    { field: "city", headerName: "City", width: 150, sortable: true },
    { field: "postcode", headerName: "Postcode", width: 120, sortable: true },
    { field: "streetaddress", headerName: "Street", width: 250, sortable: true },
   
  ];

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetchCustomers()
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err));
  };

  return (
    <>
      <AddCustomer getCustomers={getCustomers} />
      <div style={{ height: 600 }}>
        <DataGrid
          autoPageSize
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          showToolbar
        />
      </div>
    </>
  );
}

export default CustomerList;