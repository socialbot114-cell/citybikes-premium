import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroVisuals } from './HeroVisuals';

export const HeroSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <main className="relative z-10 pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-semibold mb-8 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <Globe className="w-4 h-4" />
                            {t('future_of_mobility')}
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                            <span className="text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-2xl">{t('hero_title_1')}</span> <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)] dark:drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                {t('hero_title_2')}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-xl leading-relaxed font-light border-l-4 border-cyan-500/50 pl-6">
                            {t('hero_subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.6)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/app')}
                                className="relative group px-10 py-5 text-xl font-bold text-white bg-cyan-600 rounded-2xl overflow-hidden transition-all duration-300 border border-cyan-400/50"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-100 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                <div className="relative flex items-center gap-3">
                                    {t('enter_app')} <Globe className="w-6 h-6 animate-pulse" />
                                </div>
                            </motion.button>
                            <button
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 text-xl font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white glass-premium rounded-2xl border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                {t('learn_more')}
                            </button>
                        </div>
                    </motion.div>

                    <HeroVisuals />
                </div>
            </div>
        </main>
    );
};
