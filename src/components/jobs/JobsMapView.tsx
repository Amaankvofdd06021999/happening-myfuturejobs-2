import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Briefcase, DollarSign, Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface JobLocation {
  id: string;
  title: string;
  company: string;
  location: string;
  latitude: number;
  longitude: number;
  salary: string;
  type: string;
  matchScore?: number;
  hiringTime?: string;
  applicants?: number;
  isAIRecommended?: boolean;
}

const JobsMapView = () => {
  const [selectedJob, setSelectedJob] = useState<JobLocation | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([3.1390, 101.6869]); // Default to KL
  const [jobs, setJobs] = useState<JobLocation[]>([
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Petronas Digital',
      location: 'KLCC, Kuala Lumpur',
      latitude: 3.1579,
      longitude: 101.7119,
      salary: 'RM 6,500 - 8,500',
      type: 'Full-time',
      matchScore: 92,
      hiringTime: 'Immediate',
      applicants: 45,
      isAIRecommended: true
    },
    {
      id: '2',
      title: 'Operations Executive',
      company: 'MISC Berhad',
      location: 'Selangor',
      latitude: 3.0738,
      longitude: 101.5183,
      salary: 'RM 4,200 - 5,500',
      type: 'Full-time',
      matchScore: 85,
      hiringTime: 'Q1 2026',
      applicants: 23
    },
    {
      id: '3',
      title: 'Data Analyst',
      company: 'Grab Malaysia',
      location: 'Petaling Jaya',
      latitude: 3.1065,
      longitude: 101.6055,
      salary: 'RM 5,000 - 7,000',
      type: 'Full-time',
      matchScore: 88,
      hiringTime: 'Immediate',
      applicants: 67,
      isAIRecommended: true
    },
    {
      id: '4',
      title: 'Marketing Manager',
      company: 'Maybank',
      location: 'Bangsar South',
      latitude: 3.1103,
      longitude: 101.6684,
      salary: 'RM 7,000 - 9,500',
      type: 'Full-time',
      matchScore: 78,
      hiringTime: 'Q2 2026',
      applicants: 34
    },
    {
      id: '5',
      title: 'Frontend Developer',
      company: 'Shopee Malaysia',
      location: 'Cyberjaya',
      latitude: 2.9264,
      longitude: 101.6544,
      salary: 'RM 5,500 - 7,500',
      type: 'Full-time',
      matchScore: 94,
      hiringTime: 'Immediate',
      applicants: 89,
      isAIRecommended: true
    }
  ]);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const getMarkerColor = (matchScore: number) => {
    if (matchScore >= 90) return '#10b981'; // green
    if (matchScore >= 80) return '#f59e0b'; // orange
    return '#6b7280'; // gray
  };

  return (
    <div className="h-[600px] relative rounded-lg overflow-hidden border">
      <MapContainer
        center={userLocation}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User's location marker */}
        <CircleMarker
          center={userLocation}
          radius={15}
          fillColor="#3b82f6"
          fillOpacity={0.8}
          stroke={true}
          weight={2}
          color="#1e40af"
        >
          <Popup>
            <div className="text-sm font-semibold">Your Location</div>
          </Popup>
        </CircleMarker>

        {/* Job markers */}
        {jobs.map((job) => (
          <Marker
            key={job.id}
            position={[job.latitude, job.longitude]}
            eventHandlers={{
              click: () => setSelectedJob(job),
            }}
          >
            <Popup className="job-popup">
              <Card className="border-0 shadow-none p-0">
                <div className="p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{job.title}</h3>
                      <p className="text-xs text-gray-600">{job.company}</p>
                    </div>
                    {job.isAIRecommended && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                        AI
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Hiring: {job.hiringTime}</span>
                    </div>
                    {job.applicants && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{job.applicants} applicants</span>
                      </div>
                    )}
                  </div>

                  {job.matchScore && (
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-gray-600">Match Score</span>
                      <Badge
                        className={`text-xs ${
                          job.matchScore >= 90
                            ? 'bg-green-100 text-green-700'
                            : job.matchScore >= 80
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {job.matchScore}%
                      </Badge>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 text-xs">
                      Quick Apply
                    </Button>
                  </div>
                </div>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="text-xs font-semibold mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">High Match (90%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs">Good Match (80-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-xs">Fair Match (&lt;80%)</span>
          </div>
        </div>
      </div>

      {/* Distance Filter */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <label className="text-xs font-semibold">Distance</label>
        <select className="ml-2 text-xs border rounded px-2 py-1">
          <option>5 km</option>
          <option>10 km</option>
          <option>20 km</option>
          <option>50 km</option>
        </select>
      </div>
    </div>
  );
};

export default JobsMapView;