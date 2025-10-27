import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      {
        element: <TrainingList/>,
        path: "/trainings",

        },
        { index : true, element: <CustomerList/> }
    ]
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
