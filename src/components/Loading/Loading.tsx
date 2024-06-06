import { Box, Skeleton, Stack, Typography } from "@mui/material";

export const Loading: React.FC = () => {

  return (
    <>
      <Box>
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center'}} mt={2}>
          Loading...
        </Typography>
      </Box>
      <Stack spacing={1}>
      { Array(5).fill(0).map((_, i) => (
        <>
          <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
          <Skeleton variant="rectangular" width={400} height={80} />
          <Skeleton variant="rectangular" width={400} height={80} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </>
      ))}
    </Stack>
    </>
  );
}
