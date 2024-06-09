import { Box,Pagination, Stack } from "@mui/material";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleCurrentPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export const PaginationWrapper: React.FC<PaginationProps> = ({ currentPage, totalPages, handleCurrentPageChange }) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'}}>
        <Stack spacing={2} style={{ paddingTop: '16px'}}>
        <Pagination count={totalPages} page={currentPage} onChange={handleCurrentPageChange} />
        </Stack>
      </Box>
    </>
  );
}