// get Apartment id from the URl
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Apartment from '../../../models/Apartment';
import axios from 'axios';


const ApartmentDetails = () => {
  const [apartment, setApartment] = useState<Apartment>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchApartmentById() {
      try {
        const res = await axios(`http://localhost:5000/api/v1/apartments/${id}`);
        setApartment(res.data.response);
      } catch (error) {
        throw new Error('Error fetching apartment by id');
      }
    }
    fetchApartmentById();
  }, [id]);

  return (
    <div>
      <img src={apartment?.imageUrl} alt='apartment' height={500}></img>
      <h2>{apartment?.title}</h2>
    </div>
  );
};

export default ApartmentDetails;