// get Apartment id from the URl
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Apartment from '../../../models/Apartment';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import classes from './ApartmentDetails.module.css';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PaymentIcon from '@mui/icons-material/Payment';
import StraightenIcon from '@mui/icons-material/Straighten';


const ApartmentDetails: React.FC = () => {
  const [apartment, setApartment] = useState<Apartment>();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function fetchApartmentById(): Promise<void> {
      try {
        setIsLoading(true);
        const res = await axios(`http://localhost:5000/api/v1/apartments/${id}`);
        setApartment(res.data.response);
      } catch (error) {
        throw new Error('Error fetching apartment by id');
      }
      setIsLoading(false);
    }
    fetchApartmentById();
  }, [id]);

  return (
    <>
    {/* Case: Loading */}
    {
      isLoading && 
      <Box>
      <Typography variant="h3" gutterBottom>
        Loading...
      </Typography>
      </Box>
    }

    {/* Case: No Apartment */}
    { !isLoading && !apartment && <Box>
      <Typography variant="h3" gutterBottom>
        No Apartment Found
      </Typography>
    </Box>}


    {/* Case: Apartment exists */}
    { !isLoading && apartment && (
      <Box my={4} sx={{ width: '100%' }}>
      <Typography variant="h3" gutterBottom>
        {apartment?.title}
      </Typography>
      <img src={apartment?.imageUrl} alt='apartment' className={classes.image}></img>
      <Box className={classes.infoCard}>
      <Typography variant="body1" gutterBottom>
      <span className={classes.fieldTitle}>Description:</span>
      {apartment?.description.reception} reception, {apartment?.description.rooms} rooms, {apartment?.description.bathrooms} bathrooms, {apartment?.description.kitchens} kitchens.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <HomeIcon /><text className={classes.fieldTitle}>Compound:</text> {apartment?.compound}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <CurrencyPoundIcon /> <text className={classes.fieldTitle}>Price:</text> {apartment?.price}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <div className={classes.iconWrapper}>
          <StraightenIcon  color="primary"/>
        </div>
        <text className={classes.fieldTitle}>Area:</text> {apartment?.area}
      </Typography>
      <Typography variant="body1" gutterBottom>
      <LocationCityIcon/> <text className={classes.fieldTitle}>City:</text> {apartment?.city}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <LocalPhoneIcon /> <text className={classes.fieldTitle}>Phone Number:</text> {apartment?.phoneNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <PaymentIcon/><text className={classes.fieldTitle}>Payment Type:</text>{apartment?.paymentType}
      </Typography>
      <Typography variant="body1" gutterBottom>
      <CheckCircleIcon/> <text className={classes.fieldTitle}>Finished:</text> {apartment?.finished ? 'Yes' : 'No'}
      </Typography>
      </Box>
    </Box>
    )}
    </>
  );
};

export default ApartmentDetails;