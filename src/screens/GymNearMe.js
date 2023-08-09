import React, { useState } from 'react'

export default function GymNearMe() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const nearbyGyms = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          // console.log("Latitude: ", latitude);
          // console.log("Longitude: ", longitude);
          fetchGyms(latitude,longitude);
        },
        (error) => {
          // Permission denied or error occurred
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

  return (
    <div>
      <button onClick={nearbyGyms}>Find Gym Near Me</button>
    </div>
  )
}

const fetchGyms = async (latitude,longitude)=>{
   const options = {
      method: "POST",
      headers: {
          "content-Type": "application/json"
      },
      body:JSON.stringify({ latitude: latitude, longitude: longitude })
   };
   const response = await fetch("http://localhost:9000/api/findgymnearme",options)
   const status = response.status;
   const data = response.json();
}
