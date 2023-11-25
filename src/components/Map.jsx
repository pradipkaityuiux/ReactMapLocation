import React, { useEffect, useState } from 'react'
import styles from "./Map.module.css"
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useCities } from '../contexts/CityContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from "../components/Button"
import { useMapLocation } from '../hooks/useMapLocation';

export default function Map() {
  const [position, setPosition] = useState([40, 0]);
  const {cities, currentCity} = useCities();
  const {isLoading:isLoadingPosition, position:geoLocationPosition, getPosition } = useGeolocation();
  const [mapLat, mapLng] = useMapLocation();

  useEffect(function(){
    if(mapLat || mapLng) setPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(function(){
    if(geoLocationPosition) setPosition([geoLocationPosition.lat, geoLocationPosition.lng])
  }, [geoLocationPosition])

  // useEffect(function(){
  //   setPosition([mapLat, mapLng])
  // }, [currentCity])
  
  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'Loading..' : 'Use Your Location'}</Button>
      <MapContainer center={position} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            {city.cityName}
          </Popup>
        </Marker>)}
        <UpdatePosition position={position} />
        <DetectClick/>
      </MapContainer>
    </div>
  )
}

function UpdatePosition({position}){
  const map = useMap();
  map.setView(position)
  return null;
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click: e =>{
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  })
}
