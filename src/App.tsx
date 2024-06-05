import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './pages/RootLayout/RootLayout';
import { ApartmentsListing } from './pages/apartments/ApartmentsListing/ApartmentsListing';
import ApartmentDetails from './pages/apartments/ApatmentDetails/ApartmentDetails';
import { NotFound } from './components/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound /> ,
    children: [
      { path: '/', element: <Navigate to="/apartments" replace={true} /> },
      { path: '/apartments', element: <ApartmentsListing /> },
      { path: '/apartments/:id', element: <ApartmentDetails /> },
    ],
  }
]);

function App() {
  return (
    <RouterProvider router={router} />

    
  );
}

export default App;
