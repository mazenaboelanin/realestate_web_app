import { Box, CardMedia, Typography } from "@mui/material";

interface ImgCoverProps {
  imgUrl: string;
  title: string;
}

export const ImgCover: React.FC<ImgCoverProps> = ({ imgUrl, title }) => {
  return (
    <>
    <Box sx={{
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }
      }}>
      <CardMedia
        sx={{ height: 250 }}
        image={imgUrl}
        title={title}
      />
      <Typography 
        sx={{ 
          position: 'absolute',
          bottom: '5%',
          right: '4%',
          color: '#fffefc',
          background: '#0b0b0b',
          padding: '5px 10px',
          borderRadius: '10px'
        }}
      >
        Press for more details
      </Typography>
    </Box>
    </>
  );
}