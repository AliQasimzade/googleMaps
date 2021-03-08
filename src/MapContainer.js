import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const MapContainer = ({ google }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function ({ coords }) {
        const { longitude, latitude } = coords;
        console.log(coords)
        setMarkers([...markers, { longitude, latitude }]);
      },
      function () {
        console.log("Error");
      }
    );
  }, []);

  
  return (
    <div style={{position:"relative",width:"400px", height:"400px"}}>
    <Map
      zoom={11}
      stles={[
        {
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [
            {
              visibility: "simplified",
            },
            {
              hue: "#ff0000",
            },
          ],
        },
      ]}
      google={google}
      initialCenter={{ lat:40.3668992, lng: 49.9023872} }
    >
      {markers.map((mark, index) => {
       
        return (
          <Marker
            key={index}
            position={{
              lat: mark.latitude,
              lng: mark.longitude,
            }}
            onClick={() => console.log("You clicked me!", { index })}
          />
        );
      })}
    </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDt0QbHtczioyT77M0Bq8SxdvAuPHJcsOo",
})(MapContainer);
