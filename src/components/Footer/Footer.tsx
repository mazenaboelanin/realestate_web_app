import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from './Footer.module.css';

const Footer = () =>{
  return (
    <Box
      component="footer"
      sx={{bgcolor: '#1976D2', color: 'white' , py: 3, mt: 'auto'}}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" >
              We are XYZ company, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2">
              Email: info@example.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link to="https://www.facebook.com/" className={classes.socialMedia}>
              <Facebook />
            </Link>
            <Link
              to="https://www.instagram.com/"
              className={classes.socialMedia}
            >
              <Instagram />
            </Link>
            <Link to="https://www.twitter.com/"  className={classes.socialMedia}>
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            {"Copyright © "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;