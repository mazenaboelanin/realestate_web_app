import { Box, Button, Grid, Typography } from "@mui/material";
import classes from '../Error/Error.module.css';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

interface ErrorProps {
  children: React.ReactNode;
  text: string;
  navigation?: string;
  canReload?: boolean;
}

export const EmptyState: React.FC <ErrorProps> = ({ children, text, canReload, navigation }) => {
  return (
    <>
      <Box className={ classes.container} maxWidth="sm" style={{ minHeight: '70vh'}} my={2}>
        <Grid container spacing={2} style={{ width: '100%', height: '100%'}}>
          <Grid item xs={12} md={12}  xl={12} className={ classes.imgGrid}>
            <SentimentDissatisfiedIcon fontSize="large" color="primary" style={{ fontSize: '5rem'}}/>
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
          <Box sx={{ textAlign: 'center'}}>
          <Typography gutterBottom>
              <h2> Unfortunately there is {children}</h2>
          </Typography>
          <Typography gutterBottom>
            <p> {text} </p>
          </Typography>
            { canReload && <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Reload</Button>}

            { navigation && <Button variant="contained" color="primary" href={navigation}>Navigate</Button>}
          </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}