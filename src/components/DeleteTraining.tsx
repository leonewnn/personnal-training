import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { TrainingWithCustomer } from '../types';
import { deleteTraining } from '../trainingapi';

type DeleteTrainingProps = {
  getTrainings: () => void;
  trainingRow: TrainingWithCustomer;
}

export default function DeleteTraining({ getTrainings, trainingRow }: DeleteTrainingProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteTraining(trainingRow.id)
      .then(() => {
        getTrainings();
        handleClose();
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the training "{trainingRow.activity}" 
            for {trainingRow.customer.firstname} {trainingRow.customer.lastname}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}