interface Apartment {
  id: number;
  title: string;
  imageUrl: string;
  description: {
    rooms: number;
    bathrooms: number;
    kitchens: number;
    reception: number;
  };
  area: number;
  compound: string;
  price: number;
  city: string;
  phoneNumber: string;
  paymentType: string;
  finished: boolean;
};

export default Apartment;