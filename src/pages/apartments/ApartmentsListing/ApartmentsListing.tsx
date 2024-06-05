import { useEffect, useState } from "react";
import Apartment from "../../../models/Apartment";
import { ApartmentListCard } from "../../../components/ApartmentListCard/ApartmentListCard";
import { Loading } from "../../../components/Loading/Loading";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { Error } from "../../../components/Error/Error";
import { Pagination, Stack, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";


export const ApartmentsListing: React.FC = () => {
  // const [page, setPage] = useState(1);
  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  const { fetchedData: apartments,
    isLoading,
    error
  } = useFetch<Apartment[]>('http://localhost:5000/api/v1/apartments', []);

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