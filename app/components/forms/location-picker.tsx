"use client";

import { Input } from "@heroui/react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  type MapRef,
  type MarkerDragEvent,
  type ViewStateChangeEvent,
  type GeolocateEvent, // Import the specific type for GeolocateEvent
} from "react-map-gl/mapbox-legacy";
import "mapbox-gl/dist/mapbox-gl.css";

// --- 1. CONSTANTS AND TYPES (Externalized) ---

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationPickerProps {
  location: string;
  coordinates: Coordinates;
  onLocationChange: (location: string) => void;
  onCoordinatesChange: (coordinates: Coordinates) => void;
  className?: string;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const INITIAL_ZOOM = 14;
const GLOBAL_ZOOM = 1.5;

const MAP_STYLES = {
  Streets: "mapbox://styles/mapbox/streets-v12",
  Satellite: "mapbox://styles/mapbox/satellite-v9",
  Light: "mapbox://styles/mapbox/light-v11",
  Dark: "mapbox://styles/mapbox/dark-v11",
  Outdoors: "mapbox://styles/mapbox/outdoors-v12",
};

// --- 2. MAPBOX SERVICE UTILITIES ---

// Forward Geocoding (Search)
const geocodeLocation = async (query: string, countryCode?: string) => {
  if (!query || query.length < 3) return [];

  try {
    const params = new URLSearchParams({
      access_token: MAPBOX_TOKEN,
      limit: "5",
      types: "country,region,district,place,locality,neighborhood,address,poi",
      ...(countryCode && { country: countryCode }),
    });

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?${params}`
    );
    const data = await response.json();
    return data.features || [];
  } catch (error) {
    console.error("Mapbox Geocoding Error:", error);
    return [];
  }
};

// Reverse Geocoding (Coordinates to Address)
const reverseGeocode = async (lng: number, lat: number) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    return data.features.length > 0
      ? data.features[0].place_name
      : "Unknown Location";
  } catch (error) {
    console.error("Mapbox Reverse Geocoding Error:", error);
    return "Unknown Location";
  }
};

// --- 3. THE COMPONENT ---

export default function LocationPicker({
  location,
  coordinates,
  onLocationChange,
  onCoordinatesChange,
  className = "",
}: LocationPickerProps) {
  const mapRef = useRef<MapRef>(null);
  const [searchQuery, setSearchQuery] = useState(location);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mapStyleKey, setMapStyleKey] =
    useState<keyof typeof MAP_STYLES>("Streets");

  // State for Map View
  const [viewState, setViewState] = useState({
    longitude: coordinates.lng || 0,
    latitude: coordinates.lat || 20,
    zoom: coordinates.lat && coordinates.lng ? INITIAL_ZOOM : GLOBAL_ZOOM,
  });

  const hasValidCoordinates = useMemo(
    () => coordinates.lat !== 0 && coordinates.lng !== 0,
    [coordinates]
  );

  // --- 4. CALLBACKS ---

  // Reverse geocoding and state update logic (reusable)
  const updateLocationFromCoords = useCallback(
    async (lng: number, lat: number, shouldFlyTo = false) => {
      const placeName = await reverseGeocode(lng, lat);

      onCoordinatesChange({ lat, lng });
      onLocationChange(placeName);
      setSearchQuery(placeName);

      if (shouldFlyTo) {
        mapRef.current?.flyTo({
          center: [lng, lat],
          zoom: INITIAL_ZOOM,
          duration: 1000,
        });
      }
    },
    [onCoordinatesChange, onLocationChange]
  );

  // Handle selecting a search result
  const handleSelectResult = useCallback(
    (result: any) => {
      const [lng, lat] = result.center;
      // Use the reusable update function
      updateLocationFromCoords(lng, lat, true);
      setShowResults(false);
    },
    [updateLocationFromCoords]
  );

  // Handle map click
  const handleMapClick = useCallback(
    (event: any) => {
      const { lng, lat } = event.lngLat;
      updateLocationFromCoords(lng, lat);
    },
    [updateLocationFromCoords]
  );

  // Handle marker drag end
  const handleMarkerDragEnd = useCallback(
    (event: MarkerDragEvent) => {
      const { lng, lat } = event.lngLat;
      updateLocationFromCoords(lng, lat);
    },
    [updateLocationFromCoords]
  );

  // Handle marker drag (updates coordinates in real-time)
  const handleMarkerDrag = (event: MarkerDragEvent) => {
    const { lng, lat } = event.lngLat;
    onCoordinatesChange({ lat, lng });
  };

  // *** FIX IMPLEMENTATION START ***
  // Handler for when the user clicks the Geolocate button
  const handleGeolocate = useCallback(
    async (e: GeolocateEvent) => {
      const { longitude, latitude } = e.coords;
      // Use the reusable update function, forcing a map fly-to
      updateLocationFromCoords(longitude, latitude, true);
    },
    [updateLocationFromCoords]
  );
  // *** FIX IMPLEMENTATION END ***

  // --- 5. EFFECTS ---

  // Effect 1: Update map view when coordinates change externally
  useEffect(() => {
    if (hasValidCoordinates) {
      setViewState((prev) => ({
        ...prev,
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        zoom: INITIAL_ZOOM,
      }));
    }
  }, [coordinates.lat, coordinates.lng, hasValidCoordinates]);

  // Effect 2: Initial user location request (only runs once on mount if no coordinates exist)
  useEffect(() => {
    if (!hasValidCoordinates && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use the reusable function without flying (as we set viewState directly below)
          updateLocationFromCoords(longitude, latitude);

          setViewState((prev) => ({
            ...prev,
            longitude,
            latitude,
            zoom: INITIAL_ZOOM,
          }));
        },
        (error) => {
          console.log("User denied location or error occurred:", error.message);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount

  // Effect 3: Debounced search logic
  useEffect(() => {
    if (searchQuery.length < 3 || searchQuery === location) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      // Search worldwide - no country code restriction
      const results = await geocodeLocation(searchQuery);
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, location]);

  // --- 6. RENDER LOGIC ---

  if (!MAPBOX_TOKEN) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
          ⚠️ Mapbox token not found. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your
          .env file.
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <label className="block text-sm font-medium mb-2">Location</label>
        {/* ... Search Input and Dropdown remains the same ... */}
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          placeholder="Search for a location worldwide..."
          description="Search for any address or place name around the world"
          classNames={{
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />

        {/* Search Results Dropdown */}
        {showResults && searchQuery.length >= 3 && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-default-200 max-h-60 overflow-y-auto">
            {isSearching ? (
              <div className="p-3 text-sm text-default-500">Searching...</div>
            ) : (
              searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectResult(result)}
                  className="w-full text-left p-3 hover:bg-default-100 transition-colors border-b border-default-100 last:border-b-0"
                >
                  <p className="text-sm font-medium">{result.text}</p>
                  <p className="text-xs text-default-500">
                    {result.place_name}
                  </p>
                </button>
              ))
            )}
          </div>
        )}
        {showResults &&
          !isSearching &&
          searchQuery.length >= 3 &&
          searchResults.length === 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-default-200 p-3 text-sm text-default-500">
              No results found.
            </div>
          )}
      </div>

      {/* Coordinates Display */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-default-600 mb-1">
            Latitude
          </label>
          <div className="px-3 py-2 bg-default-100 rounded-lg text-sm font-mono">
            {hasValidCoordinates ? coordinates.lat.toFixed(6) : "Not set"}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-default-600 mb-1">
            Longitude
          </label>
          <div className="px-3 py-2 bg-default-100 rounded-lg text-sm font-mono">
            {hasValidCoordinates ? coordinates.lng.toFixed(6) : "Not set"}
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium">
            Pin Location on Map
          </label>
          {/* Map Style Selector */}
          <select
            value={mapStyleKey}
            onChange={(e) =>
              setMapStyleKey(e.target.value as keyof typeof MAP_STYLES)
            }
            className="px-2 py-1 border border-default-300 rounded-md text-sm dark:bg-gray-700"
          >
            {Object.keys(MAP_STYLES).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-default-500">
          Click on the map to set location or drag the marker. The map defaults
          to your current location.
        </p>
        <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-default-200">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
            onClick={handleMapClick}
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: "100%", height: "100%" }}
            mapStyle={MAP_STYLES[mapStyleKey]}
          >
            {/* Navigation Controls */}
            <NavigationControl position="top-right" />

            {/* Geolocate Control - NOW CORRECTLY HANDLES CLICK EVENT */}
            <GeolocateControl
              position="top-right"
              trackUserLocation
              onGeolocate={handleGeolocate} // <--- FIX HERE
            />

            {/* Marker */}
            {hasValidCoordinates && (
              <Marker
                longitude={coordinates.lng}
                latitude={coordinates.lat}
                draggable
                onDrag={handleMarkerDrag}
                onDragEnd={handleMarkerDragEnd}
              >
                {/* Custom Marker Pin */}
                <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg cursor-move hover:scale-110 transition-transform flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Marker>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}
