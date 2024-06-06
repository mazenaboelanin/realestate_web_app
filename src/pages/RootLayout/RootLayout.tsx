import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import classes from './RootLayout.module.css';
import {  Container } from '@mui/material';

const RootLayout = () => {
  return (
      
        <>
        <Header />
        {/* <Container maxWidth="sm" style={{ minHeight: '70vh'}}> */}
          <Outlet />
        {/* </Container> */}
        <Footer />
        </>

  );
}

export default RootLayout;
