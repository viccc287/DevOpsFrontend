import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, onLocationSelect, markerColor = "blue" }) => {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  const customIcon = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const MapSelector = ({ 
  startPosition, 
  endPosition, 
  onStartSelect, 
  onEndSelect,
  height = "400px" 
}) => {
const [mapCenter, setMapCenter] = useState([20.9674, -89.5926]);
  const [activeMarker, setActiveMarker] = useState("start");

  useEffect(() => {
    if (startPosition) {
      setMapCenter([startPosition.lat, startPosition.lng]);
    } else if (endPosition) {
      setMapCenter([endPosition.lat, endPosition.lng]);
    }
  }, [startPosition, endPosition]);

  const handleLocationSelect = (latlng) => {
    if (activeMarker === "start") {
      onStartSelect({ lat: latlng.lat, lng: latlng.lng });
    } else {
      onEndSelect({ lat: latlng.lat, lng: latlng.lng });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveMarker("start")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeMarker === "start"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Select Start Point
        </button>
        <button
          type="button"
          onClick={() => setActiveMarker("end")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeMarker === "end"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Select End Point
        </button>
      </div>

      <div className="relative border rounded-lg overflow-hidden" style={{ height }}>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker
            position={startPosition}
            onLocationSelect={handleLocationSelect}
            markerColor="green"
          />
          <LocationMarker
            position={endPosition}
            onLocationSelect={handleLocationSelect}
            markerColor="red"
          />
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="font-medium text-green-800">Start Point</span>
          </div>
          {startPosition ? (
            <div className="text-green-700">
              Lat: {startPosition.lat.toFixed(6)}, Lng: {startPosition.lng.toFixed(6)}
            </div>
          ) : (
            <div className="text-green-600">Click on map to select</div>
          )}
        </div>

        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="font-medium text-red-800">End Point</span>
          </div>
          {endPosition ? (
            <div className="text-red-700">
              Lat: {endPosition.lat.toFixed(6)}, Lng: {endPosition.lng.toFixed(6)}
            </div>
          ) : (
            <div className="text-red-600">Click on map to select</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSelector;
