import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

function AllPlotsMap(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAoygD6-XqCvTcy4_G3FKec5LyD-Z8UxOg",
  });

  const MapCoords = props.mapCoords;

  return (
    isLoaded && (
      <GoogleMap
        mapContainerClassName="App-map"
        center={
          MapCoords[0]
            ? { lat: MapCoords[0][1].lat, lng: MapCoords[0][1].lng }
            : { lat: 12.9165, lng: 79.1325 }
        }
        zoom={12}
        version="weekly"
        on
        mapContainerStyle={containerStyle}
      >
        {MapCoords.map((Coord) => {
          return (
            <>
              <Polygon
                // Make the Polygon editable / draggable
                path={Coord}
              ></Polygon>
            </>
          );
        })}
      </GoogleMap>
    )
  );
}

export default AllPlotsMap;
