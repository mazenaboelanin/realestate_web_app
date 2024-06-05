interface Apartment {
  id: number;
  title: string;
  imageUrl: string;
  description: {
    info: string;
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
  finishedDate: Date;
};

export default Apartment;