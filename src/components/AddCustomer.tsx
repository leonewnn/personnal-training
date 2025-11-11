import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { CustomerForm } from '../types';
import { saveCustomer } from '../cutsomerapi';

type AddCustomerProps = {
  getCustomers: () => void;
}

export default function AddCustomer({ getCustomers }: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerForm>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: ""
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    saveCustomer(customer)
    .then(() => { 
      getCustomers();
      handleClose(); 
    })
    .catch(err => console.error(err))
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          borderColor: '#19d2adff',
          color: '#19d2adff'
        
        }}
      >
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new Customer</DialogTitle>
        <DialogContent>
            <TextField
              value={customer.firstname}
              onChange={event => setCustomer({ ...customer, firstname: event.target.value })}
              margin="dense"
              label="First Name"
              fullWidth
              variant="standard"
            />
            <TextField
              value={customer.lastname}
              onChange={event => setCustomer({ ...customer, lastname: event.target.value })}
              margin="dense"
              label="Last Name"
              fullWidth
              variant="standard"
            />
            <TextField
              value={customer.email}
              onChange={event => setCustomer({ ...customer, email: event.target.value })}
              margin="dense"
              label="Email"
              fullWidth
              variant="standard"
            />
            <TextField
              value={customer.phone}
              onChange={event => setCustomer({ ...customer, phone: event.target.value })}
              margin="dense"
              label="Phone"
              fullWidth
              variant="standard"
            />
            <TextField
              value={customer.streetaddress}
              onChange={event => setCustomer({ ...customer, streetaddress: event.target.value })}
              margin="dense"
              label="Street Address"
              fullWidth
              variant="standard"
            />
            <TextField
              value={customer.postcode}
              onChange={event => setCustomer({ ...customer, postcode: event.target.value })}
              margin="dense"
              label="Postcode"
              fullWidth
              variant="standard"
            />
            <TextField
              value={customer.city}
              onChange={event => setCustomer({ ...customer, city: event.target.value })}
              margin="dense"
              label="City"
              fullWidth
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}