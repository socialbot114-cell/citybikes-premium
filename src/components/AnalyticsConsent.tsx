import { useEffect, useState } from 'react';
import { BarChart3, X } from 'lucide-react';
import { enableAnalytics, getAnalyticsConsent, revokeAnalyticsConsent } from '../lib/analytics';

export const AnalyticsConsent = () => {
    const [visible, setVisible] = useState(() => !getAnalyticsConsent());

    useEffect(() => {
        if (getAnalyticsConsent()) enableAnalytics().catch(() => undefined);
    }, []);

    const grant = () => {
        localStorage.setItem('citybikes_analytics_consent', 'granted');
        setVisible(false);
        enableAnalytics().catch(() => undefined);
    };

    const decline = () => {
        revokeAnalyticsConsent();
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <aside className="analytics-consent" aria-label="Analytics consent">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><BarChart3 className="h-4 w-4" /></div>
                <div className="min-w-0">
                    <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Help us improve CityBikes</h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">We use privacy-focused analytics to understand what works. No location, message content, or personal identity is collected.</p>
                </div>
                <button type="button" onClick={decline} aria-label="Decline analytics" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={decline} className="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10">Not now</button>
                <button type="button" onClick={grant} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700">Allow analytics</button>
            </div>
        </aside>
    );
};
