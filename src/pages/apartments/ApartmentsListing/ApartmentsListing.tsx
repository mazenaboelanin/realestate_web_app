import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import classes from "./ApartmentsListing.module.css";

import Apartment from "../../../models/Apartment";
import { ApartmentListCard } from "../../../components/ApartmentListCard/ApartmentListCard";
import { Loading } from "../../../components/Loading/Loading";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { Error } from "../../../components/Error/Error";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";


export const ApartmentsListing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(queryParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const handleCurrentPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    queryParams.set('page', String(value));
    navigate({ search: queryParams.toString() });
  };

  const { fetchedData: apartments,
    metaData,
    isLoading,
    error
  } = useFetch<Apartment[]>(`http://localhost:5000/api/v1/apartments?page=${currentPage}&countPerPage=${5}`, [], [currentPage]);

  return (
    <>

<Container maxWidth="sm" style={{ minHeight: '70vh'}}>

    {
      !isLoading && !error && apartments.length > 0 &&
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'}}>
        <Stack spacing={2} style={{ paddingTop: '16px'}}>
        <Pagination count={metaData?.totalPages} page={currentPage} onChange={handleCurrentPageChange} />
        </Stack>
      </Box>
    }



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

    </Container>
    </>
  );
};