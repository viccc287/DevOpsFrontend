import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [20, 32],
    iconAnchor: [10, 32],
    popupAnchor: [1, -28],
    shadowSize: [32, 32],
  });
};

const MapController = ({ bounds }) => {
  const map = useRef();

  useEffect(() => {
    if (bounds && map.current) {
      map.current.fitBounds(bounds, { padding: [10, 10] });
    }
  }, [bounds]);

  return null;
};

const MiniMap = ({ startLat, startLng, endLat, endLng, height = "200px" }) => {
  const startPos = [parseFloat(startLat), parseFloat(startLng)];
  const endPos = [parseFloat(endLat), parseFloat(endLng)];

  // Calculate bounds to fit both markers
  const bounds = [
    [Math.min(startPos[0], endPos[0]), Math.min(startPos[1], endPos[1])],
    [Math.max(startPos[0], endPos[0]), Math.max(startPos[1], endPos[1])],
  ];

  return (
    <div
      className="relative rounded-lg overflow-hidden bg-gray-100"
      style={{ height }}
    >
      <MapContainer
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Start marker */}
        <Marker position={startPos} icon={createCustomIcon("green")} />

        {/* End marker */}
        <Marker position={endPos} icon={createCustomIcon("red")} />

        <MapController bounds={bounds} />
      </MapContainer>

      {/* Overlay with route info */}
      <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 rounded px-2 py-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Start</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">End</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
