import { useEffect, useState } from "react";
import Apartment from "../../../models/Apartment";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ApartmentListCard } from "../../../components/ApartmentListCard/ApartmentListCard";


export const ApartmentsListing: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function fetchApartments(): Promise<void>{
      try {
        setIsLoading(true);
        const res = await axios.get('http://localhost:5000/api/v1/apartments');
        console.log(res.data.response);
        setApartments(res.data.response);
      } catch (error) {
        throw new Error('Error fetching apartments');
      }
      setIsLoading(false);
    }
    fetchApartments();
  }, []);


  const navigate = useNavigate();

  function handleClick(id: number) {
    navigate(`/apartments/${id}`);
  }

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
    { !isLoading && apartments.length === 0 && <Box>
      <Typography variant="h3" gutterBottom>
        No Apartment Found
      </Typography>
      </Box>
    }

    {/* Case: Apartment exists */}
    { !isLoading && apartments.length > 0 && (
      <>
      {apartments.map((apartment) => (
        <ApartmentListCard apartment={apartment} />
      ))}
      </>
    )
    }

    
    </>
  );
};