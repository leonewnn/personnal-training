import { useEffect, useState } from "react";
import type { Customer } from "../types";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { fetchCustomers } from "../cutsomerapi";

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 150, sortable: true },
    { field: "lastname", headerName: "Last name", width: 150, sortable: true },
    { field: "email", headerName: "Email", width: 220, sortable: true },
    { field: "phone", headerName: "Phone", width: 150, sortable: true },
    { field: "city", headerName: "City", width: 150, sortable: true },
    { field: "postcode", headerName: "Postcode", width: 120, sortable: true },
    { field: "streetaddress", headerName: "Street", width: 250, sortable: true }
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
    <div style={{ height: 600 }}>
      <DataGrid
        autoPageSize
        rows={customers}
        columns={columns}
        getRowId={(row) => row._links.self.href}
        showToolbar
      />
    </div>
  );
}

export default CustomerList;