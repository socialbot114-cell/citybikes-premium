import * as L from 'leaflet';

export const createCustomMarker = (_type: 'bike' | 'ev' | 'poi' | 'alert' | 'water' | 'toilet', color: string, iconHtml?: string) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute inset-0 rounded-full animate-ping opacity-20" style="background-color: ${color}"></div>
                <div class="absolute inset-0 rounded-full blur-md opacity-40" style="background-color: ${color}"></div>
                <div class="relative w-5 h-5 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-125 flex items-center justify-center" style="background-color: ${color}">
                    ${iconHtml || ''}
                </div>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });
};

export const bikeIcon = createCustomMarker('bike', '#22c55e');
export const evIcon = createCustomMarker('ev', '#06b6d4', '<svg viewBox="0 0 24 24" width="10" height="10" stroke="white" stroke-width="3" fill="none"><path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z"/></svg>');
export const poiIcon = createCustomMarker('poi', '#a855f7');
export const waterIcon = createCustomMarker('water', '#3b82f6', '<svg viewBox="0 0 24 24" width="10" height="10" stroke="white" stroke-width="3" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>');
export const toiletIcon = createCustomMarker('toilet', '#f97316', '<svg viewBox="0 0 24 24" width="10" height="10" stroke="white" stroke-width="3" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
export const alertIcon = createCustomMarker('alert', '#ef4444');
