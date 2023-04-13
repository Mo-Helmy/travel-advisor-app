import { CssBaseline, Grid } from '@mui/material';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { useEffect, useState } from 'react';
import { getPlacesData, getWeatherData } from './api';

function App() {
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState(null);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    setFilteredPlaces(places.filter((place) => Number(place.rating) > rating));
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        setFilteredPlaces(null);
        setIsLoading(false);
      });

      getWeatherData(coords.lat, coords.lng).then((data) =>
        setWeatherData(data)
      );
    }
  }, [bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
