import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../context/CityBikesContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const NetworkSearch = () => {
    const { networks, selectNetwork } = useCityBikes();
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof networks>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 1) {
            setResults(networks.filter(n =>
                n.name.toLowerCase().includes(val.toLowerCase()) ||
                n.location.city.toLowerCase().includes(val.toLowerCase())
            ).slice(0, 10));
        } else {
            setResults([]);
        }
    };

    return (
        <div className="absolute top-4 right-4 z-[9999] flex flex-col items-end gap-2 font-sans w-80">
            <LanguageSwitcher />

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
                <div className="w-full mt-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto border border-slate-200 dark:border-slate-700/50 transition-all">
                    {results.map(network => (
                        <button
                            key={network.id}
                            className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700/50 last:border-0 transition-all duration-200"
                            onClick={() => {
                                selectNetwork(network.id);
                                setResults([]);
                                setQuery('');
                            }}
                        >
                            <div className="font-semibold text-cyan-400">{network.name}</div>
                            <div className="text-sm text-slate-400">{network.location.city}, {network.location.country}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
