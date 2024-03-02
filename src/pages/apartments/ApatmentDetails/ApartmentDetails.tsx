// get Apartment id from the URl
import { useParams } from 'react-router-dom';

const ApartmentDetails = () => {
  const { id } = useParams();


  return (
    <div>
      <h1>ApartmentDetails</h1>
      <p>{id}</p>
    </div>
  );
};

export default ApartmentDetails;