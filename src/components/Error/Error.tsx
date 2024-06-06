import { Box, Button, Grid, Typography } from "@mui/material";
import classes from './Error.module.css';
import ErrorIcon from '@mui/icons-material/Error';


interface ErrorProps {
  children: React.ReactNode;
}

export const Error: React.FC<ErrorProps> = ({children}) => {
  return (
    <>
    <Box className={ classes.container} maxWidth="sm" style={{ minHeight: '70vh'}} my={2}>
      <Grid container spacing={2} style={{ width: '100%', height: '100%'}}>
        <Grid item xs={12} md={12}  xl={12} className={ classes.imgGrid}>
          <ErrorIcon fontSize="large" color="error" style={{ fontSize: '5rem'}}/>
        </Grid>
        <Grid item xs={12} md={12} xl={12}>
        <Box sx={{ textAlign: 'center'}}>
          <h2> Something went wrong!</h2>

          <Typography gutterBottom>
            <span> <span style={{ color: 'darkred'}}>Error Message:</span> {children}</span>
        </Typography>
        <h4>Please Check Again </h4>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Reload</Button>
        </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
