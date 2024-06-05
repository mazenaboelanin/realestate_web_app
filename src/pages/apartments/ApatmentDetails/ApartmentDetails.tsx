// get Apartment id from the URl
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Apartment from '../../../models/Apartment';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { ApartmentDetailsCard } from '../../../components/ApartmentDetailsCard/ApartmentDetailsCard';


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
      <ApartmentDetailsCard apartment={apartment} />
    )}
    </>
  );
};

export default ApartmentDetails;