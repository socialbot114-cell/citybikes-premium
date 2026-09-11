const SWETRIX_SCRIPT = 'https://swetrix.org/swetrix.js';
const SWETRIX_API = 'https://blogs-swetrix-frontend.rwezkp.easypanel.host/backend/v1/log';
const SWETRIX_PID = import.meta.env.VITE_SWETRIX_PID || 'UF6zohwRMHkw';

type AnalyticsMeta = Record<string, string | number | boolean>;

declare global {
    interface Window {
        swetrix?: {
            init: (projectId: string, options?: { apiURL?: string }) => void;
            trackViews: () => void;
            track: (event: { ev: string; meta?: AnalyticsMeta }) => void;
        };
    }
}

let loadPromise: Promise<void> | null = null;

export function enableAnalytics(): Promise<void> {
    if (window.swetrix) {
        window.swetrix.init(SWETRIX_PID, { apiURL: SWETRIX_API });
        window.swetrix.trackViews();
        return Promise.resolve();
    }

    if (!loadPromise) {
        loadPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = SWETRIX_SCRIPT;
            script.defer = true;
            script.onload = () => {
                if (!window.swetrix) {
                    reject(new Error('Swetrix failed to initialize'));
                    return;
                }
                window.swetrix.init(SWETRIX_PID, { apiURL: SWETRIX_API });
                window.swetrix.trackViews();
                resolve();
            };
            script.onerror = () => reject(new Error('Swetrix script failed to load'));
            document.head.appendChild(script);
        });
    }

    return loadPromise;
}

export function trackEvent(event: string, meta?: AnalyticsMeta) {
    window.swetrix?.track({ ev: event, meta });
}

export function getAnalyticsConsent(): boolean {
    return localStorage.getItem('citybikes_analytics_consent') === 'granted';
}

export function revokeAnalyticsConsent() {
    localStorage.removeItem('citybikes_analytics_consent');
}
