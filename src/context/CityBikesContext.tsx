import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Network, NetworkDetail, Location } from '../types';
import { fetchNetworks, fetchNetworkDetails } from '../api/citybikes';

interface CityBikesContextProps {
    networks: Network[];
    loading: boolean;
    userLocation: Location | null;
    refreshNetworks: () => void;
    selectedNetwork: NetworkDetail | null;
    selectNetwork: (id: string) => Promise<void>;
    clearSelection: () => void;
}

const CityBikesContext = createContext<CityBikesContextProps | undefined>(undefined);

export const CityBikesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [networks, setNetworks] = useState<Network[]>([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkDetail | null>(null);

    const loadNetworks = async () => {
        setLoading(true);
        try {
            const data = await fetchNetworks();
            setNetworks(data);
        } catch (error) {
            console.error("Failed to fetch networks", error);
        } finally {
            setLoading(false);
        }
    };

    const selectNetwork = async (id: string) => {
        setLoading(true);
        try {
            const detail = await fetchNetworkDetails(id);
            setSelectedNetwork(detail);
        } catch (error) {
            console.error("Failed to fetch network details", error);
        } finally {
            setLoading(false);
        }
    };

    const clearSelection = () => {
        setSelectedNetwork(null);
    };

    useEffect(() => {
        loadNetworks();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        city: 'Current Location',
                        country: ''
                    });
                },
                (error) => console.error(error)
            );
        }
    }, []);

    return (
        <CityBikesContext.Provider value={{
            networks,
            loading,
            userLocation,
            refreshNetworks: loadNetworks,
            selectedNetwork,
            selectNetwork,
            clearSelection
        }}>
            {children}
        </CityBikesContext.Provider>
    );
};

export const useCityBikes = () => {
    const context = useContext(CityBikesContext);
    if (!context) throw new Error("useCityBikes must be used within CityBikesProvider");
    return context;
};
