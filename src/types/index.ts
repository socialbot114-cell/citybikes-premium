export interface Location {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
}

export interface Network {
    id: string;
    name: string;
    company?: string | string[];
    href: string;
    location: Location;
}

export interface Station {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    timestamp: string;
    free_bikes: number;
    empty_slots: number | null;
    extra?: {
        uid?: string;
        last_updated?: number;
        payment?: string[];
        renting?: number;
        returning?: number;
        slots?: number;
        has_ebikes?: boolean;
        ebikes?: number;
        address?: string;
    };
}

export interface NetworkDetail extends Network {
    stations: Station[];
}
