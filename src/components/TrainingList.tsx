import { useEffect, useState } from "react";
import type { TrainingWithCustomer } from "../types";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { fetchTrainingsWithCustomer } from "../trainingapi";
import dayjs from "dayjs";

function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);

  const formatDate = (iso: string) => dayjs(iso).format("DD.MM.YYYY HH:mm");

  const columns: GridColDef<TrainingWithCustomer>[] = [
    { field: "activity", headerName: "Activity", width: 180 },
    { 
      field: "date", 
      headerName: "Date", 
      width: 220,
      valueGetter: (value) => formatDate(value)
    },
    { field: "duration", headerName: "Duration (min)", width: 150 },
    { 
      field: "customer", 
      headerName: "Customer", 
      width: 200,
      valueGetter: (value, row) => `${row.customer.firstname} ${row.customer.lastname}`
    }
  ];

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetchTrainingsWithCustomer()
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ height: 600 }}>
      <DataGrid
        rows={trainings}
        columns={columns}
        getRowId={(row) => row.id}
         showToolbar
      />
    </div>
  );
}

export default TrainingList;