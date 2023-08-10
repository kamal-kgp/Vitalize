import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ center, coordinates }) => {
//const center = [coordinates[0].lat, coordinates[0].lng]; // Set the center of the map

  return (
    <MapContainer center={center} zoom={10} style={{ width: '100%', height: '400px' }}>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      {coordinates.map((coord) => (
        <Marker key={coord.id} position={[coord.lat, coord.lng]} >
          <Popup>{coord.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
