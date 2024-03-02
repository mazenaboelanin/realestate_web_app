import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import classes from './RootLayout.module.css';
import {  Container } from '@mui/material';

const RootLayout = () => {
  return (
      <Container maxWidth="sm">
        <Header />
        <Outlet />
        <Footer />
      </Container>
  );
}

export default RootLayout;
