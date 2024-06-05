import { Box, Typography } from "@mui/material";

export const EmptyState: React.FC = () => {
  return (
    <>
    <Box>
      <Typography variant="h3" gutterBottom>
        No Apartment Found
      </Typography>
      </Box>
    </>
  );
}