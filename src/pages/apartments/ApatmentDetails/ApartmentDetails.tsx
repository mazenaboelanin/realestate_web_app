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
import DescriptionIcon from '@mui/icons-material/Description';


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
        <DescriptionIcon color="primary" />
          <span className={classes.fieldTitle}>Description:</span>
          <span className={classes.block}>
          <span className={classes.detailValue} > {apartment?.description.reception} reception</span>
          <span className={classes.detailValue}> {apartment?.description.rooms} rooms</span>
          <span className={classes.detailValue}> {apartment?.description.bathrooms} bathrooms</span>
          <span className={classes.detailValue}> {apartment?.description.kitchens} kitchens.</span>
          </span>
        </Typography>
      <Typography variant="body1" gutterBottom>
        <HomeIcon color="primary" />
        <span className={classes.fieldTitle}>Compound:</span> 
        <span className={classes.detailValue}>{apartment?.compound}</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <CurrencyPoundIcon color="primary" />
        <span className={classes.fieldTitle}>Price:</span>
        <span className={classes.detailValue}>{apartment?.price}</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <StraightenIcon color="primary"/>
        <span className={classes.fieldTitle}>Area:</span>
        <span className={classes.detailValue}>{apartment?.area}</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
      <LocationCityIcon color="primary"/>
      <span className={classes.fieldTitle}>City:</span>
      <span className={classes.detailValue}>{apartment?.city}</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <LocalPhoneIcon color="primary" />
        <span className={classes.fieldTitle}>Phone Number:</span> 
        <span className={classes.detailValue} >{apartment?.phoneNumber}</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <PaymentIcon color="primary"/>
        <span className={classes.fieldTitle}>Payment Type:</span>
        <span className={classes.detailValue}>{apartment?.paymentType}</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
      <CheckCircleIcon color="primary"/>
      <span className={classes.fieldTitle}>Finished:</span> 
      <span className={classes.detailValue}>{apartment?.finished ? 'Yes' : 'No'}</span>
      </Typography>
      </Box>
    </Box>
    )}
    </>
  );
};

export default ApartmentDetails;