import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import classes from './ApartmentListCard.module.css';
import Apartment from "../../models/Apartment";
import { useNavigate } from "react-router-dom";
import PaidIcon from '@mui/icons-material/Paid';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import { ImgCover } from "../ImgCover/ImgCover";

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
      <Card sx={{ maxWidth: 500 }}  key={apartment.id} className={classes.margin} onClick={handleClick.bind(null, apartment?.id)}>
        <ImgCover imgUrl={apartment.imageUrl} title={apartment.title}/>
        <CardContent>
          <Typography  variant="h5" component="div" className={ classes.title}>
            {apartment?.title}
          </Typography>
          <Typography className={classes.compound} sx={{ mb: 1}}>
            {apartment?.compound}
          </Typography>
          <Typography className={ classes.info} sx={{ mb: 2}}>
            {apartment?.description?.info}
          </Typography>
          <Typography className={ classes.area }>
          <HomeIcon/>
            {apartment?.area} m²
          </Typography>
          <Typography className={ classes.price}>
            <PaidIcon />
            {apartment?.price} EGP
          </Typography>
          <Box className={ classes.phoneNumber } onClick={() => window.location.href = `tel:${apartment.phoneNumber}`}>
            <PhoneIcon />
          </Box>

        </CardContent>
        {/* <CardActions>
          <Button size="small" onClick={handleClick.bind(null, apartment?.id)}>Apartment Details</Button>
        </CardActions> */}
        </Card>
    </>
  );
} 