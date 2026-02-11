import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Sparkles as SparklesIcon } from 'lucide-react';

export const LandingHeader = () => {
    const { t } = useTranslation();

    return (
        <header className="fixed top-0 w-full z-50 glass-premium border-b border-white/5 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 animate-pulse-glow" />
                        <SparklesIcon className="relative w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold neon-text tracking-tight">
                        {t('app_title')}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
};
