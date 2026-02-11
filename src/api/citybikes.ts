import axios from 'axios';
import type { Network, NetworkDetail } from '../types';

const API_URL = 'https://api.citybik.es/v2/networks';

export const fetchNetworks = async (): Promise<Network[]> => {
    const response = await axios.get<{ networks: Network[] }>(API_URL);
    return response.data.networks;
};

export const fetchNetworkDetails = async (id: string): Promise<NetworkDetail> => {
    const response = await axios.get<{ network: NetworkDetail }>(`${API_URL}/${id}`);
    return response.data.network;
};
