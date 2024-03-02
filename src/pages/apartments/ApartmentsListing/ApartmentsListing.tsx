import { useEffect, useState } from "react";
import Apartment from "../../../models/Apartment";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import classes  from './ApartmentsListing.module.css';


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


  const navigate = useNavigate();

  function handleClick(id: number) {
    navigate(`/apartments/${id}`);
  }

  return (
    <>
    {apartments.map((apartment) => (
        <Card sx={{ maxWidth: 500 }}  key={apartment.id} className={classes.margin}>
        <CardMedia
          sx={{ height: 200 }}
          image={apartment?.imageUrl}
          title={apartment?.title}
        />
        <CardContent>
          <Typography  variant="h5" component="div">
            {apartment?.title}
          </Typography>
          <Typography>
            Compound: {apartment?.compound}
          </Typography>
          <Typography>
            Price: {apartment?.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick.bind(null, apartment?.id)}>Apartment Details</Button>
        </CardActions>
        </Card>
        ))}
    </>
  );
};