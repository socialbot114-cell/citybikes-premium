import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return (
        <div className="flex items-center gap-2 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md p-2 rounded-xl border border-slate-200 dark:border-slate-700/50 transition-colors">
            <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent text-sm text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer font-medium"
            >
                <option value="en" className="dark:bg-slate-800 dark:text-white">EN</option>
                <option value="pt" className="dark:bg-slate-800 dark:text-white">PT</option>
                <option value="es" className="dark:bg-slate-800 dark:text-white">ES</option>
                <option value="fr" className="dark:bg-slate-800 dark:text-white">FR</option>
            </select>
        </div>
    );
};
