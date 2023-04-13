import { AppBar, Box, InputBase, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search.js';
import { Autocomplete } from '@react-google-maps/api';

import useStyles from './styles.js';
import { useState } from 'react';

const Header = ({ setCoords }) => {
  const { classes } = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({ lat, lng });
  };
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Typography variant="h5">Travel Advisor</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6" display={{ xs: 'none', md: 'block' }}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                sx={{
                  color: 'inherit',
                  '& .MuiInputBase-input': {
                    padding: 2,
                    width: { xs: '20ch', md: '100%' },
                  },
                }}
                startAdornment={<SearchIcon sx={{ ml: 2 }} />}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
