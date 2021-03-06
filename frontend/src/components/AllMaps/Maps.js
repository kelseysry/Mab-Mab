// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader, InfoBox, InfoWindow } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
// import allMarkers from '../../data/markers';
import './AllMaps.css'
import { useState, useEffect } from 'react'; // side effects
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../store/maps';
import pictures from "../../data/pictures"

const containerStyleSmall = {
  width: '300px',
  height: '400px',
};

const containerStyle = {
  width: '900px',
  height: '600px',
};

const AllMaps = (({ apiKey, allMarkers }) => {
  const [selectedCenter, setSelectedCenter] = useState(null);

  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);


  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedCenter(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const center = {
    // lat: 11.56975258696104,
    // lng: 104.92100199755971
    lat: parseFloat(11.563513146861608), lng: parseFloat(104.91629988375026)
  }

  const options = { closeBoxURL: '', enableEventPropagation: true };

  if (!key) {
    return null;
  }

  const handleRestaurantLink = () => {

    history.push(`/business/${selectedCenter?.businessId}`)

  }

  return (
    <>
    <script async
      src={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}>
    </script>

    <div className="big-screen-home">

      {isLoaded && (
      <GoogleMap
      id="marker-example"
      mapContainerStyle={containerStyle}
      zoom={14}
      center={center}
      >

      {allMarkers.map((center, idx) => (
            <Marker
              key={idx}

              position={{
                lat: parseFloat(center.marker.position.position.lat),
                lng: parseFloat(center.marker.position.position.lng)
              }}

              // causes pop up
              onClick={() => {
                setSelectedCenter(center);
            }}
            />
          ))}

          {selectedCenter && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedCenter(null);
                }}
                position={{
                  lat: parseFloat(selectedCenter.marker.position.position.lat),
                  lng: parseFloat(selectedCenter.marker.position.position.lng)
                }}
              >
                <div className="image-title-map-container" style={{ backgroundImage: `url('${selectedCenter.image}')`}}>
                  <div className="image-title-map">
                  <button
                    onClick={handleRestaurantLink}
                  >
                    <img className="map-link" src={pictures.collection[14].imageUrl} />
                  </button>
                  {selectedCenter.marker.title}

                  </div>
                </div>
              </InfoWindow>
            )}
      </GoogleMap>
      )}
</div>

<div className ="small-screen-map">
{isLoaded && (
      <GoogleMap
      id="marker-example"
      mapContainerStyle={containerStyleSmall}
      zoom={14}
      center={center}
      >

      {allMarkers.map((center, idx) => (
            <Marker
              key={idx}

              position={{
                lat: parseFloat(center.marker.position.position.lat),
                lng: parseFloat(center.marker.position.position.lng)
              }}

              // causes pop up
              onClick={() => {
                setSelectedCenter(center);
            }}
            />
          ))}

  {selectedCenter && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedCenter(null);
                }}
                position={{
                  lat: parseFloat(selectedCenter.marker.position.position.lat),
                  lng: parseFloat(selectedCenter.marker.position.position.lng)
                }}
              >
                <div className="image-title-map-container" style={{ backgroundImage: `url('${selectedCenter.image}')`}}>
                  <div className="image-title-map">
                  <button
                    onClick={handleRestaurantLink}
                  >
                    <img className="map-link" src={pictures.collection[14].imageUrl} />
                  </button>
                  {selectedCenter.marker.title}
                  </div>
                </div>
              </InfoWindow>
            )}
      </GoogleMap>
      )}
</div>

    </>
  );
}
)

export default React.memo(AllMaps);
