import { motion } from 'framer-motion';
import { Leaf, Users, Bike, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HeroVisuals = () => {
    const { t } = useTranslation();

    return (
        <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="relative z-10 grid grid-cols-2 gap-6 perspective-1000">
                <div className="space-y-6 pt-12">
                    <motion.div
                        whileHover={{ y: -10, rotate: 2 }}
                        className="glass-premium p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl transition-all duration-500 group"
                    >
                        <div className="h-40 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl flex items-center justify-center mb-4 border border-green-500/20 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-shadow">
                            <Leaf className="w-16 h-16 text-green-600 dark:text-green-400 drop-shadow-lg" />
                        </div>
                        <div className="font-bold text-lg text-green-800 dark:text-green-100">{t('stats_zero_emissions')}</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -10, rotate: -1 }}
                        className="glass-premium p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl transition-all duration-500 group"
                    >
                        <div className="h-32 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/20 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-shadow">
                            <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 drop-shadow-lg" />
                        </div>
                        <div className="font-bold text-md text-purple-800 dark:text-purple-100">{t('stats_global_tribe')}</div>
                    </motion.div>
                </div>
                <div className="space-y-6">
                    <motion.div
                        whileHover={{ y: -10, rotate: -2 }}
                        className="glass-premium p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl transition-all duration-500 group"
                    >
                        <div className="h-32 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl flex items-center justify-center mb-4 border border-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow">
                            <Bike className="w-12 h-12 text-cyan-600 dark:text-cyan-400 drop-shadow-lg" />
                        </div>
                        <div className="font-bold text-md text-cyan-800 dark:text-cyan-100">{t('stats_tech_first')}</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -10, rotate: 1 }}
                        className="glass-premium p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl transition-all duration-500 group"
                    >
                        <div className="h-40 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-2xl flex items-center justify-center mb-4 border border-orange-500/20 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-shadow">
                            <Heart className="w-16 h-16 text-orange-600 dark:text-orange-400 drop-shadow-lg" />
                        </div>
                        <div className="font-bold text-lg text-orange-800 dark:text-orange-100">{t('stats_vitality')}</div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
