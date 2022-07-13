import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import RemoveIcon from '@mui/icons-material/Remove';

const { ipcRenderer } = window.require('electron');

export const TitleBar = ({ height, title = '' }) => {
  const handleOnClick = (event) => {
    ipcRenderer.send(event);
  };

  const IconBox = ({ component: Component, hoverColor, onClick, eventName }) => {
    const size = 42;
    return (
      <Grid
        sx={{
          width: size,
          height: size,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: '0.2s background',
          '&:hover': {
            background: hoverColor,
            transition: 'none',
          },
        }}
        onClick={() => onClick(eventName)}
      >
        <Component fontSize="small" />
      </Grid>
    );
  };

  return (
    <>
      <Grid
        sx={{
          height,
          justifyContent: 'space-between',
          display: 'flex',
          pl: 2,
          alignItems: 'center',
        }}
      >
        <Grid className="titlebar" sx={{ display: 'flex', flexGrow: 1 }}>
          {title}
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            flexShrink: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            zIndex: 3,
          }}
        >
          <IconBox
            eventName="minimize"
            component={RemoveIcon}
            hoverColor="#333"
            onClick={handleOnClick}
          />
          <IconBox
            eventName="maximize"
            component={CropSquareIcon}
            hoverColor="#333"
            onClick={handleOnClick}
          />
          <IconBox
            eventName="close"
            component={CloseIcon}
            hoverColor="red"
            onClick={handleOnClick}
          />
        </Grid>
      </Grid>
    </>
  );
};
