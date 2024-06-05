import { Box, Typography } from "@mui/material";

interface ErrorProps {
  children: React.ReactNode;
}

export const Error: React.FC<ErrorProps> = ({children}) => {
  return (
    <>
      <Box>
        <Typography variant="h3" gutterBottom>
          {children}
        </Typography>
      </Box>
    </>
  );
}
