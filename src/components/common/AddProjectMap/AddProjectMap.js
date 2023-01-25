import React, { memo, useCallback, useRef, useState } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "460px"
};


function AddProjectMap(props) {
  const {plots}=props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAoygD6-XqCvTcy4_G3FKec5LyD-Z8UxOg",
  });
  console.log(props.prefill);
  const [path, setPath] = useState([]);
  const [centerState, setCenterState] = useState({});
  function getMyLocation() {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition((position) => {
        setCenterState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setPath([{
          "lat": (position.coords.latitude - 0.01),
          "lng": (position.coords.longitude + 0.01)
        },
        {
          "lat": (position.coords.latitude - 0.08),
          "lng": (position.coords.longitude + 0.02)
        },
        {
          "lat": (position.coords.latitude - 0.25),
          "lng": (position.coords.longitude + 0.03)
        }]);
      }, (error) => {
        setCenterState({ latitude: "err-latitude", longitude: "err-longitude" });
      });
    }
  }
  React.useEffect(() => {
    props.prefill === undefined && getMyLocation();
    (props.prefill !== undefined && props.prefill.length !== 0) && (setPath(props.prefill));
    (props.prefill !== undefined && props.prefill.length !== 0) && (setCenterState({lat: props.prefill[0].lat, lng: props.prefill[0].lng }));
  }, [props.prefill]);

  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const memo = useCallback((nextPath) => { console.log(nextPath); return props.onChange(nextPath); }, [props]);

  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      // setPath(nextPath, () => {console.log("test",path)});
      setPath(() => { return nextPath; });
      memo(nextPath);
    }
  }, [memo]);



  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      console.log(path);
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  return (

    isLoaded && <GoogleMap
      mapContainerClassName="App-map"
      center={{ lat: centerState.lat, lng: centerState.lng }}
      zoom={12}
      version="weekly"
      on
      mapContainerStyle={containerStyle}
    >
      <Polygon
        // Make the Polygon editable / draggable
        editable
        draggable
        path={path}
        // Event used when manipulating and adding points
        onMouseUp={onEdit}
        // Event used when dragging the whole Polygon
        onDragEnd={onEdit}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </GoogleMap>
  );
}

export default memo(AddProjectMap);
