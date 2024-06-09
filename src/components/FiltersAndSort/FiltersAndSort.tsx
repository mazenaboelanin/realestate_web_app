
import { Box, Button, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type FiltersAndSortProps = {
  handleFilterChange: (event: SelectChangeEvent<unknown>, filterType: string) => void;
  handleOrderChange: (event: SelectChangeEvent<unknown>, orderName: string) => void;
  handleApplyFiltersAndSort: () => void;
};


export const FiltersAndSort: React.FC<FiltersAndSortProps> = ({ handleFilterChange, handleOrderChange, handleApplyFiltersAndSort }) => {

  return (
    <>
      {/* FILTERING*/}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  padding: '16px 16px 10px' }}>
        <Typography variant="h6" mr={2}>Filter</Typography>
        <FormControl sx={{ marginRight: '10px'}} fullWidth>
          <InputLabel id="demo-simple-select-label">Area</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={area}
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
            // value={price}
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
    </>
  );

}