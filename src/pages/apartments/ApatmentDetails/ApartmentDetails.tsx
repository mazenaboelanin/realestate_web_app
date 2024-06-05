// get Apartment id from the URl
import { useParams } from 'react-router-dom';
import Apartment from '../../../models/Apartment';
import { ApartmentDetailsCard } from '../../../components/ApartmentDetailsCard/ApartmentDetailsCard';
import { Loading } from '../../../components/Loading/Loading';
import { EmptyState } from '../../../components/EmptyState/EmptyState';
import { useFetch } from '../../../hooks/useFetch';
import { InitialApartment } from '../../../models/InitialApartment';
import { Error } from '../../../components/Error/Error';


const INITIAL_APARTMENT = InitialApartment;

const ApartmentDetails: React.FC = () => {
  const { id } = useParams();

  const { 
    fetchedData: apartment, 
    isLoading,
    error 
  } = useFetch<Apartment>(`http://localhost:5000/api/v1/apartments/${id}`, INITIAL_APARTMENT , [id]);

  return (
    <>

    {/* Case: Error */}
    { !isLoading && error && <Error> { error?.message } </Error> }
    
    {/* Case: Loading */}
    { isLoading && !error && <Loading/> }

    {/* Case: No Apartment */}
    { !isLoading && !error && !apartment && <EmptyState /> }


    {/* Case: Apartment exists */}
    { !isLoading && !error && apartment && <ApartmentDetailsCard apartment={apartment} /> }
    </>
  );
};

export default ApartmentDetails;