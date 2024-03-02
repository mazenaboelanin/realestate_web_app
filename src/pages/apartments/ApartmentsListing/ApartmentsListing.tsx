import { useEffect, useState } from "react";
import Apartment from "../../../models/Apartment";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ApartmentsListing = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    async function fetchApartments() {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/apartments');
        console.log(res.data.response);
        setApartments(res.data.response);

      } catch (error) {
        throw new Error('Error fetching apartments');
      }
    }
    fetchApartments();
  }, []);

  return (
    <div>
      <h1>ApartmentsListing</h1>
      <ul>
        {apartments.map((apartment) => (
          <li 
            key={apartment.id} 
          >
            {apartment?.title}
          </li>
        ))}
      </ul>
    </div>
  );
};