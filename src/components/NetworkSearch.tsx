import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../context/CityBikesContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const NetworkSearch = () => {
    const { networks, selectNetwork, favorites } = useCityBikes();
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof networks>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 1) {
            const filtered = networks.filter(n =>
                n.name.toLowerCase().includes(val.toLowerCase()) ||
                n.location.city.toLowerCase().includes(val.toLowerCase())
            );

            // Sort: Favorites first, then name
            const sorted = [...filtered].sort((a, b) => {
                const aFav = favorites.networks.includes(a.id);
                const bFav = favorites.networks.includes(b.id);
                if (aFav && !bFav) return -1;
                if (!aFav && bFav) return 1;
                return a.name.localeCompare(b.name);
            });

            setResults(sorted.slice(0, 10));
        } else {
            setResults([]);
        }
    };

    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[5000] flex items-center gap-4 font-sans w-full max-w-2xl px-4 pointer-events-none">
            <div className="flex-1 max-w-md pointer-events-auto">
                <div className="relative group w-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl py-3 pl-10 pr-4 shadow-xl focus:outline-none focus:ring-0 placeholder-slate-400 border border-slate-200 dark:border-transparent transition-all"
                            placeholder={t('search_placeholder')}
                            value={query}
                            onChange={handleSearch}
                        />
                        <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto border border-slate-200 dark:border-slate-700/50 transition-all">
                        {results.map(network => (
                            <button
                                key={network.id}
                                className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700/50 last:border-0 transition-all duration-200 flex items-center justify-between"
                                onClick={() => {
                                    selectNetwork(network.id);
                                    setResults([]);
                                    setQuery('');
                                }}
                            >
                                <div>
                                    <div className="font-semibold text-cyan-400">{network.name}</div>
                                    <div className="text-sm text-slate-400">{network.location.city}, {network.location.country}</div>
                                </div>
                                {favorites.networks.includes(network.id) && (
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="pointer-events-auto">
                <LanguageSwitcher />
            </div>
        </div>
    );
};
