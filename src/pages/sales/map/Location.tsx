import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps";
import {
  MY_GOOGLE_API_KEY,
  MY_GOOGLE_MAP_PUBLIC_ID,
} from "@/lib/constants/constants";

type Poi = { key: string; location: google.maps.LatLngLiteral };

const PoiMarker = ({ pois }: { pois: Poi }) => {
  return (
    <AdvancedMarker key={pois.key} position={pois.location}>
      <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
    </AdvancedMarker>
  );
};

interface LocationProps {
  name: string;
  coordinates: {
    lat: string;
    lng: string;
  };
}

const Location = ({ name, coordinates }: LocationProps) => {
  const lat = parseFloat(coordinates?.lat);
  const lng = parseFloat(coordinates?.lng);

  // Check if lat and lng are valid numbers
  const isValidCoordinates = !isNaN(lat) && !isNaN(lng);
  const shopLocation = {
    key: name,
    location: isValidCoordinates
      ? { lat, lng }
      : { lat: -33.860664, lng: 151.208138 }, // Default to a valid location
  };

  return (
    <div>
      <APIProvider apiKey={MY_GOOGLE_API_KEY}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: lat, lng: lng }}
          initialViewState={{
            latitude: lat,
            longitude: lng,
            zoom: 8,
          }}
          mapId={MY_GOOGLE_MAP_PUBLIC_ID}
          style={{ width: "668px", height: "407px" }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        >
          <PoiMarker pois={shopLocation} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default Location;
