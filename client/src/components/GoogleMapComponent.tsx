import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function GoogleMapComponent() {
  const googleAPIKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const mapContainerStyle = {
    height: "100vh",
    width: "100%",
  };

  const center = {
    lat: -33.8688,
    lng: 151.2093,
  };

  return (
    <LoadScript googleMapsApiKey={googleAPIKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      ></GoogleMap>
    </LoadScript>
  );
}
