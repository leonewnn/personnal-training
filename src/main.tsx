import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <TrainingList />,
        path: "/trainings",
      },
      {
        element: <Calendar />,
        path: "/calendar"
      },
      {
        element: <Statistics />,
        path: "/statistics"
      },
      { index: true, element: <CustomerList /> }
    ]
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
