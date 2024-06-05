import { useEffect, useState } from "react";
import Apartment from "../../../models/Apartment";
import axios from "axios";
import { ApartmentListCard } from "../../../components/ApartmentListCard/ApartmentListCard";
import { Loading } from "../../../components/Loading/Loading";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { Error } from "../../../components/Error/Error";


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


  return (
    <>
    {/* Case: Error */}
    { !isLoading && error && <Error> { error?.message } </Error> }

    {/* Case: Loading */}
    { isLoading && !error && <Loading/> }

    {/* Case: No Apartment */}
    { !isLoading && !error && apartments.length === 0 && <EmptyState /> }

    {/* Case: Apartment exists */}
    { !isLoading && !error && apartments.length > 0 && 
      (
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