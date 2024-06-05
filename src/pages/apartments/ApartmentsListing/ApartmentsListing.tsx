import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import Apartment from "../../../models/Apartment";
import { ApartmentListCard } from "../../../components/ApartmentListCard/ApartmentListCard";
import { Loading } from "../../../components/Loading/Loading";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { Error } from "../../../components/Error/Error";
import { Pagination, Stack, Typography } from "@mui/material";
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

    {
      !isLoading && !error && apartments.length > 0 &&
      <Stack spacing={2} style={{ paddingTop: '16px'}}>
        <Typography style={{ textAlign: 'center'}}>Page: {currentPage}</Typography>
        <Pagination count={metaData?.totalPages} page={currentPage} onChange={handleCurrentPageChange} />
      </Stack>
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
    </>
  );
};