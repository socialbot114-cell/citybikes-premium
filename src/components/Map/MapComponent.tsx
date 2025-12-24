import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../../context/CityBikesContext';
import { useTheme } from '../../context/ThemeContext';

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

// Internal component to handle view updates
const MapUpdater = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const MapComponent = () => {
    const { networks, selectedNetwork, selectNetwork, userLocation, clearSelection } = useCityBikes();
    const { t } = useTranslation();
    const { theme } = useTheme();

    // Default center (e.g., Paris or User Location)
    const defaultCenter: [number, number] = userLocation
        ? [userLocation.latitude, userLocation.longitude]
        : [48.8566, 2.3522];

    const center = selectedNetwork
        ? [selectedNetwork.location.latitude, selectedNetwork.location.longitude] as [number, number]
        : defaultCenter;

    const zoom = selectedNetwork ? 13 : (userLocation ? 11 : 3);

    return (
        <div className="h-full w-full relative">
            {selectedNetwork && (
                <button
                    onClick={clearSelection}
                    className="absolute top-4 left-4 z-[1000] bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-slate-100"
                >
                    {t('start_over')}
                </button>
            )}
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    url={theme === 'dark'
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    }
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <MapUpdater center={center} zoom={zoom} />

                {/* Show Networks if none selected */}
                {!selectedNetwork && networks.map((network) => (
                    <Marker
                        key={network.id}
                        position={[network.location.latitude, network.location.longitude]}
                        eventHandlers={{
                            click: () => selectNetwork(network.id),
                        }}
                    >
                        <Popup>
                            <div className="text-slate-900">
                                <strong>{network.name}</strong><br />
                                {network.location.city}, {network.location.country}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Show Stations if Network selected */}
                {selectedNetwork && selectedNetwork.stations && selectedNetwork.stations.map((station) => (
                    <Marker
                        key={station.id}
                        position={[station.latitude, station.longitude]}
                    >
                        <Popup>
                            <div className="text-slate-900">
                                <strong>{station.name}</strong><br />
                                <span className={station.free_bikes > 0 ? "text-green-600" : "text-red-600"}>
                                    {t('bikes')}: {station.free_bikes}
                                </span><br />
                                <span className="text-slate-500">{t('slots')}: {station.empty_slots}</span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
