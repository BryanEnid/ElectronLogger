import { Box } from '@mui/material';

export const TitleBar = ({ height, title = '' }) => {
  return (
    <>
      <Box
        className="titlebar"
        sx={{
          height,
          px: 2,
          alignItems: 'center',
          display: 'flex',
          opacity: 1,
          backgroundColor: 'black',
        }}
      >
        {title}
      </Box>
    </>
  );
};
