import { Paper, Rating, Typography, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined.js';
import GoogleMapReact from 'google-map-react';

import useStyles from './styles.js';
import mapStyles from './mapStyles.js';

const Map = ({
  setCoords,
  setBounds,
  coords,
  places,
  setChildClicked,
  weatherData,
}) => {
  console.log('🚀 ~ file: Map.jsx:15 ~ weatherData:', weatherData);
  const matches = useMediaQuery('(min-width:600px)');
  const { classes } = useStyles();

  // const coords = { lat: 30, lng: 32 };
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        // defaultCenter={coords}
        center={coords}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ sw: e.bounds.sw, ne: e.bounds.ne });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places?.length &&
          places.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!matches ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {' '}
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                    }
                    alt={place.name}
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          ))}
        {weatherData && (
          <div
            lat={Number(weatherData?.coord?.lat)}
            lng={Number(weatherData?.coord?.lon)}
          >
            <img
              src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`}
              height="70px"
              alt={weatherData?.weather[0]?.description}
            />
          </div>
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
