import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "440px",
};

function SingleProjectMap(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAoygD6-XqCvTcy4_G3FKec5LyD-Z8UxOg",
  });
  console.log(props.prefill);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerClassName="App-map"
        center={
          props.prefill[0]
            ? { lat: props.prefill[0].lat, lng: props.prefill[0].lng }
            : { lat: 52.52047739093263, lng: 13.36653284549709 }
        }
        zoom={12}
        version="weekly"
        on
        mapContainerStyle={containerStyle}
      >
        <Polygon
          // Make the Polygon editable / draggable
          path={props.prefill}
          options={{
            strokeColor: "#005DAF",
            fillColor: "#005DAF",
          }}
          // Event used when manipulating and adding points
        />
      </GoogleMap>
    )
  );
}

export default SingleProjectMap;
