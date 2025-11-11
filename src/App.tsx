import { Link, Outlet } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";

export default function App() {
  return (
    <>
      <CssBaseline/>
      
      <AppBar position="fixed" sx={{ left: 0, right: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Training Management
          </Typography>

          <Box>
            <Button color="inherit" component={Link} to="/">
              Customer
            </Button>
            <Button color="inherit" component={Link} to="/trainings">
              Trainings
            </Button>
            <Button color="inherit" component={Link} to="/calendar">
              Calendar
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      
      <Toolbar />

      <Container maxWidth="lg">
        <Box sx={{ py: 2 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
