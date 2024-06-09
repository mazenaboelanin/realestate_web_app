import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import classes from "./ApartmentsListing.module.css";

import Apartment from "../../../models/Apartment";
import { ApartmentListCard } from "../../../components/ApartmentListCard/ApartmentListCard";
import { Loading } from "../../../components/Loading/Loading";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { Error } from "../../../components/Error/Error";
import { Box, Button, Container, Pagination, Stack, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const BASE_URL = 'http://localhost:5000/api/v1/apartments';
const DEFAULT_URL = `${BASE_URL}?page=1&countPerPage=5`;

export const ApartmentsListing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(queryParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [url, setUrl] = useState(`${BASE_URL}?page=${currentPage}&countPerPage=${5}`);
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

  const handleFilterChange = (event: SelectChangeEvent, filterType: string) => {
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
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  padding: '16px 16px 10px' }}>
    <Typography variant="h6" mr={2}>Filter</Typography>
    <FormControl sx={{ marginRight: '10px'}} fullWidth>
      <InputLabel id="demo-simple-select-label">Area</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={area}
        label="Area"
        onChange={(event) => handleFilterChange(event, 'area')}
      >
        <MenuItem value={''}>Clear Area Filter</MenuItem>
        <MenuItem value={'120-140'}>{ '120 - 140'}</MenuItem>
        <MenuItem value={'150-170'}>{ '150 - 170'}</MenuItem>
        <MenuItem value={'180-200'}>{ '180 - 200'}</MenuItem>
      </Select>
    </FormControl>

    <FormControl sx={{ marginRight: '10px'}} fullWidth>
      <InputLabel id="demo-simple-select-label">Price</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={price}
        label="Price"
        onChange={(event) => handleFilterChange(event, 'price')}
      >
        <MenuItem value={''}>Clear Price Filter</MenuItem>
        <MenuItem value={'1-1.5'}>{ '1m - 1.5m'}</MenuItem>
        <MenuItem value={'1.6-2'}>{ '1.6m - 2m'}</MenuItem>
        <MenuItem value={'2-3'}>{ '2m - 3m'}</MenuItem>
      </Select>
    </FormControl>
  </Box>

    {/* SORTING */}
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px 16px'}}>
  <Typography variant="h6" mr={2}>Order</Typography>
    <FormControl sx={{ marginRight: '10px'}} fullWidth>
      <InputLabel id="demo-simple-select-label">By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="orderBy"
        onChange={(event) => handleOrderChange(event, 'orderBy')}
      >
        <MenuItem value={''}>Clear order by</MenuItem>
        <MenuItem value={'createdAt'}>{'Date'}</MenuItem>
        <MenuItem value={'price'}>{ 'Price'}</MenuItem>
        <MenuItem value={'area'}>{ 'Area'}</MenuItem>
      </Select>
    </FormControl>

    <FormControl sx={{ marginRight: '10px'}} fullWidth>
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="orderType"
        onChange={(event) => handleOrderChange(event, 'orderType')}
      >
        <MenuItem value={''}>Clear order type</MenuItem>
        <MenuItem value={'ASC'}>{ 'Ascending'}</MenuItem>
        <MenuItem value={'DESC'}>{ 'Descending'}</MenuItem>
      </Select>
    </FormControl>

  </Box>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  padding: '10px 16px'}}>
    <Button variant="contained" sx={{ width: '100%'}} onClick={handleApplyFiltersAndSort}>Apply</Button>
  </Box>
  
      {/* PAGINATION */}
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