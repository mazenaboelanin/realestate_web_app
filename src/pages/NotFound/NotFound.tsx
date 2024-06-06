import { Box, Button, Grid, Typography } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import notFoundIMage from './404-page-not-found.png';
import classes from './NotFound.module.css';

export const NotFound: React.FC = () => {
  return (
  <>
    <Header />
    <Box className={ classes.container} maxWidth="sm" style={{ minHeight: '70vh'}} my={2}>
      <Grid container spacing={2} style={{ width: '100%', height: '100%'}}>
        <Grid item xs={12} md={6}  xl={6} className={ classes.imgGrid}>
        <img src={notFoundIMage} alt="404" style={{ width: '-webkit-fill-available'}}/>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
        <Box sx={{ textAlign: 'center'}}>
          <h1>404</h1>
          <h2> Page Not Found </h2>
          <p> Sorry, that page doesn't exist </p>
          <Button variant="contained" color="primary" href="/">Go to Home</Button>
        </Box>
        </Grid>
      </Grid>
    </Box>
    <Footer />
  </>
  );
}