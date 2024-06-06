import Apartment from "../../models/Apartment";
import classes from './ApartmentDetailsCard.module.css';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PaidIcon from '@mui/icons-material/Paid';
import { ApartmentDetailsTable } from "../ApartmentDetailsTable/ApartmentDetailsTable";



interface ApartmentDetailsCardProps {
  apartment: Apartment;
}

export const ApartmentDetailsCard: React.FC<ApartmentDetailsCardProps> = ({ apartment }) => {
  return (
    <>
    <Box my={4} sx={{ width: '90%' , margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'}}>
        <img src={apartment?.imageUrl} alt='apartment' className={classes.image}></img>
      </Box>

      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', color: '#052f56'}}>
        {apartment?.title}
      </Typography>


      <Box sx={{ textAlign: 'center'}} mb={2}>
        <Typography className={ classes.details }>
          <HomeIcon/>
            {apartment?.area} m²
        </Typography>
        <Typography className={ classes.details}>
            <PaidIcon />
            {apartment?.price} EGP
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.details}>
        <LocationCityIcon/>
        {apartment?.city}
        </Typography>

          <Typography variant="body1" gutterBottom className={classes.details}>
          <LocalPhoneIcon />
          {apartment?.phoneNumber}
        </Typography>
      </Box>

      <Box className={classes.info} mb={2} p={2}>
        <Typography className={classes.infoTitle}>About {apartment?.title}</Typography> 
        <Typography className={classes.infoDetails}>{apartment?.description.info} </Typography>
      </Box>

      <Box mb={2}>
        <ApartmentDetailsTable 
          description={apartment.description}
          paymentType={apartment.paymentType}
          finished={apartment.finished}
          finishedDate={apartment.finishedDate} />
      </Box>

    </Box>
    </>
  );
}