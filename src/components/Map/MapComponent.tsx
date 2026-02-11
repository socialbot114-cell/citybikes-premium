import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, Polyline } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../../context/CityBikesContext';
import { useTheme } from '../../context/ThemeContext';
import { SmartLayers } from './SmartLayers';
import { bikeIcon } from './CustomMarkers';
import { Cloud, Zap, AlertTriangle, Droplet, Navigation2, Star, LocateFixed, Navigation, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartDashboard } from '../Dashboard/SmartDashboard';

// ... (DefaultIcon and MapEventListener logic remains the same)
// Fix Leaflet default icon logic for Vite/Webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Internal component to handle view updates and event listeners
const MapEventListener = () => {
    const map = useMap();
    const { fetchSmartData } = useCityBikes();

    useEffect(() => {
        const handleMoveEnd = () => {
            const center = map.getCenter();
            fetchSmartData(center.lat, center.lng);
        };

        map.on('moveend', handleMoveEnd);
        return () => {
            map.off('moveend', handleMoveEnd);
        };
    }, [map, fetchSmartData]);

    return null;
};

const MapUpdater = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const MapComponent = () => {
    const {
        networks, selectedNetwork, selectNetwork, userLocation, clearSelection,
        weather, airQuality, smartLayers, toggleSmartLayer, favorites,
        toggleFavoriteNetwork, toggleFavoriteStation, currentRoute, fetchRoute
    } = useCityBikes();
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [mapRef, setMapRef] = useState<L.Map | null>(null);
    const [showDashboard, setShowDashboard] = useState(false);

    const handleLocateMe = () => {
        if (userLocation && mapRef) {
            mapRef.setView([userLocation.latitude, userLocation.longitude], 13);
        }
    };

    // Default center (e.g., Paris or User Location)
    const defaultCenter: [number, number] = userLocation
        ? [userLocation.latitude, userLocation.longitude]
        : [48.8566, 2.3522];

    const center = selectedNetwork
        ? [selectedNetwork.location.latitude, selectedNetwork.location.longitude] as [number, number]
        : defaultCenter;

    const zoom = selectedNetwork ? 13 : (userLocation ? 11 : 3);

    return (
        <div className="h-full w-full relative group">
            {/* Header / Context Information */}
            <AnimatePresence>
                {(selectedNetwork || (weather && airQuality)) && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-6 left-6 z-[1000] flex flex-col gap-4 max-w-sm pointer-events-none"
                    >
                        {/* Selected Network Info */}
                        {selectedNetwork && (
                            <div className="glass-premium p-4 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleFavoriteNetwork(selectedNetwork.id)}
                                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            <Star className={`w-5 h-5 ${favorites.networks.includes(selectedNetwork.id) ? 'fill-yellow-400 text-yellow-500' : 'text-slate-400'}`} />
                                        </button>
                                        <div>
                                            <h2 className="text-xl font-black text-slate-800 dark:text-white leading-tight">{selectedNetwork.name}</h2>
                                            <p className="text-xs text-slate-500 dark:text-cyan-400 font-bold uppercase tracking-widest">{selectedNetwork.location.city}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setShowDashboard(true)}
                                            className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 rounded-xl transition-all"
                                            title="View Analytics"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={clearSelection}
                                            className="p-2 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 rounded-xl transition-all"
                                        >
                                            <Navigation2 className="w-4 h-4 text-slate-700 dark:text-white rotate-45" />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-center">
                                    <div className="p-2 bg-green-500/5 border border-green-500/10 rounded-xl">
                                        <div className="text-[10px] text-green-600 dark:text-green-400 font-bold uppercase">{t('bikes')}</div>
                                        <div className="text-lg font-black dark:text-white">{selectedNetwork.stations.reduce((acc, s) => acc + s.free_bikes, 0)}</div>
                                    </div>
                                    <div className="p-2 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                                        <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">{t('slots')}</div>
                                        <div className="text-lg font-black dark:text-white">
                                            {selectedNetwork.stations.reduce((acc, s) => acc + (s.empty_slots || 0), 0)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Weather & Air Quality Glow Card */}
                        {weather && airQuality && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-premium p-5 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto overflow-hidden relative min-w-[240px]"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20 shadow-inner">
                                                <Cloud className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">{weather.temperature}°C</div>
                                                <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mt-1">{weather.description}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px] ${airQuality.label.includes('Healthy') ? 'bg-green-500 shadow-green-500/50' :
                                                    airQuality.label.includes('Alert') ? 'bg-yellow-500 shadow-yellow-500/50' : 'bg-red-500 shadow-red-500/50'
                                                    }`} />
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Air Quality</span>
                                            </div>
                                            <div className="text-xs font-black text-slate-800 dark:text-white bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg">
                                                {airQuality.label}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                                            <span>Wind: {weather.windSpeed} km/h</span>
                                            <span>AQI Index: {airQuality.aqi}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Layer Control Panel */}
            <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
                <div className="glass-premium p-2 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-1">
                    <LayerToggle
                        active={true}
                        icon={<Navigation2 className="w-4 h-4" />}
                        label="Bikes"
                        onClick={() => { }}
                    />
                    <LayerToggle
                        active={smartLayers.evStations}
                        icon={<Zap className="w-4 h-4" />}
                        label="EV Power"
                        onClick={() => toggleSmartLayer('evStations')}
                    />
                    <LayerToggle
                        active={smartLayers.earthquakes}
                        icon={<AlertTriangle className="w-4 h-4" />}
                        label="Alerts"
                        onClick={() => toggleSmartLayer('earthquakes')}
                    />
                    <LayerToggle
                        active={smartLayers.pois}
                        icon={<Droplet className="w-4 h-4" />}
                        label="Amenities"
                        onClick={() => toggleSmartLayer('pois')}
                    />
                </div>

                <div className="glass-premium p-1 rounded-xl border border-white/10 shadow-2xl flex flex-col pointer-events-auto overflow-hidden">
                    <button
                        onClick={handleLocateMe}
                        className="w-12 h-12 flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        title="Find Near Me"
                    >
                        <LocateFixed className="w-5 h-5 text-cyan-500" />
                    </button>
                </div>
            </div>

            <MapContainer
                center={center}
                zoom={zoom}
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
                ref={setMapRef}
            >
                <TileLayer
                    url={theme === 'dark'
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    }
                    attribution='&copy; OSM &copy; CARTO'
                />
                <ZoomControl position="bottomright" />
                <MapUpdater center={center} zoom={zoom} />
                <MapEventListener />
                <SmartLayers />

                {/* Routing Visualization */}
                {currentRoute && (
                    <Polyline
                        positions={currentRoute}
                        pathOptions={{
                            color: '#06b6d4',
                            weight: 6,
                            opacity: 0.8,
                            lineJoin: 'round',
                            dashArray: '1, 10'
                        }}
                    />
                )}
                {currentRoute && (
                    <Polyline
                        positions={currentRoute}
                        pathOptions={{
                            color: '#22d3ee',
                            weight: 2,
                            opacity: 1,
                        }}
                    />
                )}

                {/* User Location Marker */}
                {userLocation && (
                    <Marker
                        position={[userLocation.latitude, userLocation.longitude]}
                        icon={L.divIcon({
                            className: 'user-location-marker',
                            html: '<div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg pulse"></div>'
                        })}
                    />
                )}

                {/* Show Networks if none selected */}
                {!selectedNetwork && (
                    <MarkerClusterGroup
                        chunkedLoading
                        maxClusterRadius={50}
                        spiderfyOnMaxZoom={true}
                    >
                        {networks.map((network) => (
                            <Marker
                                key={network.id}
                                position={[network.location.latitude, network.location.longitude]}
                                icon={bikeIcon}
                                eventHandlers={{
                                    click: () => selectNetwork(network.id),
                                }}
                            >
                                <Popup className="premium-popup">
                                    <div className="p-2 min-w-[150px]">
                                        <div className="flex items-center justify-between mb-2">
                                            <strong className="text-slate-800 dark:text-white">{network.name}</strong>
                                            <Star className={`w-3.5 h-3.5 ${favorites.networks.includes(network.id) ? 'fill-yellow-400 text-yellow-500' : 'text-slate-300'}`} />
                                        </div>
                                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{network.location.city}, {network.location.country}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                )}

                {/* Show Stations if Network selected */}
                {selectedNetwork && selectedNetwork.stations && (
                    <MarkerClusterGroup
                        chunkedLoading
                        maxClusterRadius={40}
                    >
                        {selectedNetwork.stations.map((station) => (
                            <Marker
                                key={station.id}
                                position={[station.latitude, station.longitude]}
                                icon={bikeIcon}
                            >
                                <Popup className="premium-popup">
                                    <div className="p-2 min-w-[180px]">
                                        <div className="flex items-center justify-between gap-4 mb-3">
                                            <strong className="text-slate-800 dark:text-white leading-tight">{station.name}</strong>
                                            <button
                                                onClick={() => toggleFavoriteStation(station.id)}
                                                className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded transition-colors"
                                            >
                                                <Star className={`w-4 h-4 ${favorites.stations.includes(station.id) ? 'fill-yellow-400 text-yellow-500' : 'text-slate-400'}`} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="flex flex-col">
                                                <span className={`text-xl font-black ${station.free_bikes > 0 ? "text-green-500" : "text-red-500"}`}>
                                                    {station.free_bikes}
                                                </span>
                                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{t('bikes')}</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-xl font-black text-slate-700 dark:text-slate-300">
                                                    {station.empty_slots}
                                                </span>
                                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{t('slots')}</span>
                                            </div>
                                        </div>

                                        {userLocation && (
                                            <button
                                                onClick={() => fetchRoute(station.latitude, station.longitude)}
                                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20"
                                            >
                                                <Navigation className="w-3.5 h-3.5" />
                                                Get Directions
                                            </button>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                )}
            </MapContainer>

            <AnimatePresence>
                {showDashboard && (
                    <SmartDashboard onClose={() => setShowDashboard(false)} />
                )}
            </AnimatePresence>
        </div>
    );
};

const LayerToggle = ({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group/btn ${active
            ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
            }`}
    >
        <span className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover/btn:scale-110'}`}>{icon}</span>
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </button>
);

export default MapComponent;
