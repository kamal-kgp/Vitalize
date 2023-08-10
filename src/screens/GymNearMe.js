import React, { useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MapComponent from '../components/Mapcomponent';

export default function GymNearMe() {
  const [latitude, setLatitude] = useState(22.3231983);
  const [longitude, setLongitude] = useState( 87.2942637);
  const [once, setOnce] = useState(true);

  

  const nearbyGyms = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log("Latitude: ", position.coords.latitude);
          console.log("Longitude: ", position.coords.longitude);
          //fetchGyms(latitude,longitude);
        },
        (error) => {
          // Permission denied or error occurred
          console.log(error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Allow the location access.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("Try again");
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred. Try again");
              break;
            default:
              alert("Try again, later");
              console.error("Error getting location: ", error.message)
              break;
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  const coordinates = [
    
    { id: 1, lat: 22.3231983, lng: 87.2942637, name: 'Marker 2' },
    { id: 2, lat: 51.505, lng: -0.09, name: 'Marker 1' },
    // Add more coordinates...
  ];

  if(once){
    nearbyGyms();
    setOnce(false);
  }

  const theme = createTheme();
  return (
    <div>
      {latitude}:{ longitude}

      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <MapComponent center={[latitude, longitude]} coordinates={coordinates} />
      </Container>
    </ThemeProvider>
      <button onClick={nearbyGyms}>Find Gym Near Me</button>
      hello
    </div>
  )
}

const fetchGyms = async (latitude,longitude)=>{
   const options = {
      method: 'POST',
      headers: {
          "content-Type": 'application/json'
      },
      body:JSON.stringify({ latitude: latitude, longitude: longitude })
   };
   const response = await fetch("http://localhost:9000/api/findgymnearme",options)
   const status = response.status;
   const data = response.json();
   console.log(response.status, response.json());
}
