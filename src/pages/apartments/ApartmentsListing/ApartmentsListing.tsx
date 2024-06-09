import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Apartment from "../../../models/Apartment";
import { ApartmentListCard } from "../../../components/ApartmentListCard/ApartmentListCard";
import { Loading } from "../../../components/Loading/Loading";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { Error } from "../../../components/Error/Error";
import { Container } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import { SelectChangeEvent } from '@mui/material/Select';
import { FiltersAndSort } from "../../../components/FiltersAndSort/FiltersAndSort";
import { PaginationWrapper } from "../../../components/PaginationWrapper/PaginationWrapper";

const BASE_URL = 'http://localhost:5000/api/v1/apartments';
const DEFAULT_URL = `${BASE_URL}?page=1&countPerPage=5`;

export const ApartmentsListing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(queryParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [orderBy, setOrderBy] = useState({orderBy: '', orderType: ''});

  const handleCurrentPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    queryParams.set('page', String(value));
    navigate({ search: queryParams.toString() });
  };

  const { fetchedData: apartments,
    metaData,
    isLoading,
    error
  } = useFetch<Apartment[]>(url, [], [currentPage]);

  const handleFilterChange = (event: SelectChangeEvent<unknown>, filterType: string) => {
    switch (filterType) {
      case 'area':
        setArea(event.target.value as string);
        break;
      case 'price':
        setPrice(event.target.value as string);
        break;
      default:
        break;
    }
  }

  const handleOrderChange = (event: SelectChangeEvent<unknown>, orderName: string) => {
    switch (orderName) {
      case 'orderBy':
        setOrderBy({ ...orderBy, orderBy: event.target.value as string});
        break;
      case 'orderType':
        setOrderBy({ ...orderBy, orderType: event.target.value as string});
        break;
      default:
        break;
    }
  }

  const prepareFilterObject = (filterRange: string) => {
    const filterObj: {
      min: number | null;
      max: number | null;
    } = { min: null, max: null};
    
    if (filterRange) {
      const [min, max] = filterRange.split('-');
      filterObj.min = Number(min);
      filterObj.max = Number(max);
    }
    return filterObj;
  }

  const getAllFilters = () => {
    const areaFilterObject = prepareFilterObject(area);
    const priceFilterObject = prepareFilterObject(price);
    let filters = {};
    if(areaFilterObject.min && areaFilterObject.max) {
      filters = { area: areaFilterObject };
    }

    if(priceFilterObject.min && priceFilterObject.max) {
      filters = { ...filters, price: priceFilterObject };
    }

    return filters;
  }

  const handleApplyFiltersAndSort = () => {
    let newUrl = DEFAULT_URL;
    let filters = getAllFilters();

    if (filters) {
      newUrl += `&filterBy=${JSON.stringify(filters)}`;
    }

    if (orderBy.orderBy && orderBy.orderType) {
      newUrl +=`&orderBy=${JSON.stringify(orderBy)}`;
    }
  
    if (url) {
      setUrl(newUrl);
    }
  }

  return (
    <>
<Container maxWidth="sm" style={{ minHeight: '70vh'}}>
    {/* FILTERING*/}
    <FiltersAndSort
      handleFilterChange={handleFilterChange}
      handleOrderChange={handleOrderChange}
      handleApplyFiltersAndSort={handleApplyFiltersAndSort}
    />

    {/* PAGINATION */}
    {
      !isLoading && !error && apartments.length > 0 &&
      <PaginationWrapper
        currentPage={currentPage}
        totalPages={metaData?.totalPages}
        handleCurrentPageChange={handleCurrentPageChange}
      />
    }

    {/* Case: Error */}
    { !isLoading && error && <Error> { error?.message } </Error> }

    {/* Case: Loading */}
    { isLoading && !error && <Loading/> }

    {/* Case: No Apartment */}
    { !isLoading && !error && apartments.length === 0 && 
    <EmptyState text="Please reload Again" canReload={true}>
      <span> no Apartment Found </span>
    </EmptyState>}

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