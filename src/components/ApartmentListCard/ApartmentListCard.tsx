import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import classes from './ApartmentListCard.module.css';
import Apartment from "../../models/Apartment";
import { useNavigate } from "react-router-dom";

interface ApartmentListCardProps {
  apartment: Apartment;
}

export const ApartmentListCard: React.FC<ApartmentListCardProps> = ({ apartment }) => {
  const navigate = useNavigate();

  function handleClick(id: number) {
    navigate(`/apartments/${id}`);
  }

  return (
    <>
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
    </>
  );
}