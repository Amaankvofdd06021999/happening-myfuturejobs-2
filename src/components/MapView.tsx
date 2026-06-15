import { useEffect, useRef } from "react";
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";

interface MapViewProps {
  location: string;
  companyName?: string;
  className?: string;
}

export function MapView({ location, companyName, className = "" }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Simulated coordinates for Malaysian cities
  const locationCoordinates: Record<string, { lat: number; lng: number; zoom: number }> = {
    "Kuala Lumpur": { lat: 3.1390, lng: 101.6869, zoom: 13 },
    "Petaling Jaya": { lat: 3.1073, lng: 101.6067, zoom: 13 },
    "Shah Alam": { lat: 3.0733, lng: 101.5185, zoom: 13 },
    "Cyberjaya": { lat: 2.9225, lng: 101.6556, zoom: 14 },
    "Putrajaya": { lat: 2.9264, lng: 101.6964, zoom: 13 },
    "Penang": { lat: 5.4141, lng: 100.3288, zoom: 12 },
    "Georgetown": { lat: 5.4141, lng: 100.3288, zoom: 13 },
    "Johor Bahru": { lat: 1.4927, lng: 103.7414, zoom: 12 },
    "Ipoh": { lat: 4.5975, lng: 101.0901, zoom: 12 },
    "Kota Kinabalu": { lat: 5.9804, lng: 116.0735, zoom: 12 },
    "Kuching": { lat: 1.5533, lng: 110.3592, zoom: 12 },
    "Melaka": { lat: 2.1896, lng: 102.2501, zoom: 13 },
    "Remote": { lat: 3.1390, lng: 101.6869, zoom: 5 },
  };

  const coords = locationCoordinates[location] || locationCoordinates["Kuala Lumpur"];

  useEffect(() => {
    // In a real implementation, you would integrate with a map library like Mapbox, Google Maps, or Leaflet
    // For this demo, we'll create a static map visualization
    if (mapRef.current) {
      // Map initialization would go here
    }
  }, [location]);

  return (
    <div className={`relative rounded-[12px] overflow-hidden bg-inset ${className}`}>
      {/* Map Container */}
      <div ref={mapRef} className="relative h-full w-full bg-gradient-to-br from-primary/5 to-primary/10">
        {/* Static Map Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Location Marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Pulse Animation */}
            <div className="absolute inset-0 animate-ping">
              <div className="h-12 w-12 rounded-full bg-primary/30" />
            </div>
            {/* Marker */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Location Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card/95 via-card/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-600">{companyName || "Company Location"}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {location}
              </p>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur hover:bg-card transition-colors">
              <Navigation className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-card/80 backdrop-blur hover:bg-card transition-colors">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-card/80 backdrop-blur hover:bg-card transition-colors">
            <ZoomOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Distance Badge */}
      {location !== "Remote" && (
        <div className="absolute left-4 top-4 rounded-full bg-card/80 backdrop-blur px-3 py-1">
          <p className="text-xs font-600">~{Math.floor(Math.random() * 20 + 5)} km away</p>
        </div>
      )}
    </div>
  );
}