import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { TrainingForm, Customer } from '../types';
import { saveTraining } from '../trainingapi';
import dayjs, { Dayjs } from 'dayjs';

type AddTrainingProps = {
  customer: Customer;
  onSuccess: () => void;
}

export default function AddTraining({ customer, onSuccess }: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDate(dayjs());
    setActivity("");
    setDuration("");
  };

  const handleSave = () => {
    if (!date || !activity || !duration) {
      alert("Please fill all fields");
      return;
    }

    const training: TrainingForm = {
      date: date.toISOString(),
      activity,
      duration: Number(duration),
      customer: customer._links.self.href
    };

    saveTraining(training)
      .then(() => {
        onSuccess();
        handleClose();
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training for {customer.firstname} {customer.lastname}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "dense",
                  variant: "standard"
                }
              }}
            />
          </LocalizationProvider>
          <TextField
            value={activity}
            onChange={event => setActivity(event.target.value)}
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            value={duration}
            onChange={event => setDuration(event.target.value)}
            margin="dense"
            label="Duration (minutes)"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}