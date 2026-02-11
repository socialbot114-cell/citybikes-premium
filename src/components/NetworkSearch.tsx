import { useState, useEffect, useRef } from 'react';
import { Search, Star, Loader2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../context/CityBikesContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const NetworkSearch = () => {
    const { networks, selectNetwork, favorites, loading } = useCityBikes();
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof networks>([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Filter logic
    useEffect(() => {
        if (query.length >= 2) {
            const filtered = networks.filter(n => {
                const name = (n.name || '').toLowerCase();
                const city = (n.location.city || '').toLowerCase();
                const country = (n.location.country || '').toLowerCase();
                const q = query.toLowerCase();
                return name.includes(q) || city.includes(q) || country.includes(q);
            });

            // Sort: Favorites first, then name
            const sorted = [...filtered].sort((a, b) => {
                const aFav = favorites.networks.includes(a.id);
                const bFav = favorites.networks.includes(b.id);
                if (aFav && !bFav) return -1;
                if (!aFav && bFav) return 1;
                return a.name.localeCompare(b.name);
            });

            setResults(sorted.slice(0, 10)); // Top 10 matches
        } else {
            setResults([]);
        }
    }, [query, networks, favorites]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setResults([]);
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const clearSearch = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[5000] flex items-center gap-4 font-sans w-full max-w-2xl px-4 pointer-events-none">
            <div className="flex-1 max-w-md pointer-events-auto" ref={searchRef}>
                <div className="relative group w-full">
                    {/* Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30 transition duration-500 ${isFocused ? 'opacity-100' : 'group-hover:opacity-100'}`}></div>

                    <div className="relative flex items-center">
                        <input
                            type="text"
                            className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-10 shadow-xl focus:outline-none focus:ring-0 placeholder-slate-400 border border-slate-200 dark:border-slate-800 transition-all font-medium"
                            placeholder={loading ? "Loading networks..." : t('search_placeholder')}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            disabled={loading}
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin text-cyan-500" /> : <Search className="w-5 h-5" />}
                        </div>

                        {query && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Dropdown */}
                {query.length >= 2 && isFocused && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto border border-slate-200 dark:border-slate-800 transition-all animate-in fade-in zoom-in-95 duration-200">
                        {results.length > 0 ? (
                            results.map(network => (
                                <button
                                    key={network.id}
                                    className="w-full text-left px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors duration-200 flex items-center justify-between group"
                                    onClick={() => {
                                        selectNetwork(network.id);
                                        setResults([]);
                                        setQuery('');
                                        setIsFocused(false);
                                    }}
                                >
                                    <div>
                                        <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                            {network.name}
                                        </div>
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                                            {network.location.city}, {network.location.country}
                                        </div>
                                    </div>
                                    {favorites.networks.includes(network.id) && (
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-500 text-sm font-medium">
                                No networks found matching "{query}"
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="pointer-events-auto">
                <LanguageSwitcher />
            </div>
        </div>
    );
};
