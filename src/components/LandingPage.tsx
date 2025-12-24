// import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bike, Leaf, Globe, X, Send, Heart, Users, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Footer } from './Footer';

export const LandingPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [activeModal, setActiveModal] = useState<'esg' | 'green' | 'health' | 'community' | null>(null);

    const modalContent = {
        esg: {
            title: t('esg_title'),
            content: t('esg_desc')
        },
        green: {
            title: t('green_title'),
            content: t('green_desc')
        },
        health: {
            title: t('health_title'),
            content: t('health_desc')
        },
        community: {
            title: t('community_title'),
            content: t('community_desc')
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0B0F19] transition-colors duration-500 text-slate-900 dark:text-white overflow-hidden relative font-sans">
            {/* Fog/Smoke Layers */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-blue-400/10 dark:bg-blue-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-drift-slow" />
                <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/10 dark:bg-cyan-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-drift-medium" />
                <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[60%] bg-purple-400/10 dark:bg-purple-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-drift-slow" />
            </div>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass-premium border-b border-white/5 transition-all duration-300">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 animate-pulse-glow" />
                            <Sparkles className="relative w-6 h-6 text-cyan-400" />
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

            {/* Hero Section */}
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
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-950/30 text-cyan-300 rounded-full text-sm font-semibold mb-8 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] backdrop-blur-md">
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
                                <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 text-xl font-bold text-slate-300 hover:text-white glass-premium rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    {t('learn_more')}
                                </button>
                            </div>
                        </motion.div>

                        {/* Visual/Graphic Area */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse-glow" />
                            <div className="relative z-10 grid grid-cols-2 gap-6 perspective-1000">
                                <div className="space-y-6 pt-12">
                                    <div className="glass-premium p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl transform hover:-translate-y-2 hover:rotate-2 transition-all duration-500 group">
                                        <div className="h-40 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl flex items-center justify-center mb-4 border border-green-500/20 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-shadow">
                                            <Leaf className="w-16 h-16 text-green-600 dark:text-green-400 drop-shadow-lg" />
                                        </div>
                                        <div className="font-bold text-lg text-green-800 dark:text-green-100">{t('stats_zero_emissions')}</div>
                                    </div>
                                    <div className="glass-premium p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl transform hover:-translate-y-2 hover:-rotate-1 transition-all duration-500 group">
                                        <div className="h-32 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/20 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-shadow">
                                            <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 drop-shadow-lg" />
                                        </div>
                                        <div className="font-bold text-md text-purple-800 dark:text-purple-100">{t('stats_global_tribe')}</div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="glass-premium p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl transform hover:-translate-y-2 hover:-rotate-2 transition-all duration-500 group">
                                        <div className="h-32 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl flex items-center justify-center mb-4 border border-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow">
                                            <Bike className="w-12 h-12 text-cyan-600 dark:text-cyan-400 drop-shadow-lg" />
                                        </div>
                                        <div className="font-bold text-md text-cyan-800 dark:text-cyan-100">{t('stats_tech_first')}</div>
                                    </div>
                                    <div className="glass-premium p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl transform hover:-translate-y-2 hover:rotate-1 transition-all duration-500 group">
                                        <div className="h-40 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-2xl flex items-center justify-center mb-4 border border-orange-500/20 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-shadow">
                                            <Heart className="w-16 h-16 text-orange-600 dark:text-orange-400 drop-shadow-lg" />
                                        </div>
                                        <div className="font-bold text-lg text-orange-800 dark:text-orange-100">{t('stats_vitality')}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div id="features" className="mt-40">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4 neon-text">{t('why_choose')}</h2>
                                <p className="text-slate-400 text-lg max-w-md">{t('why_choose_subtitle')}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    id: 'esg',
                                    icon: <Leaf className="w-8 h-8 text-green-400" />,
                                    title: t('esg_title'),
                                    desc: t('esg_desc'),
                                    gradient: 'from-green-500/5 to-emerald-500/5',
                                    border: 'group-hover:border-green-500/50'
                                },
                                {
                                    id: 'green',
                                    icon: <Bike className="w-8 h-8 text-cyan-400" />,
                                    title: t('green_title'),
                                    desc: t('green_desc'),
                                    gradient: 'from-cyan-500/5 to-blue-500/5',
                                    border: 'group-hover:border-cyan-500/50'
                                },
                                {
                                    id: 'health',
                                    icon: <Heart className="w-8 h-8 text-orange-400" />,
                                    title: t('health_title'),
                                    desc: t('health_desc'),
                                    gradient: 'from-orange-500/5 to-red-500/5',
                                    border: 'group-hover:border-orange-500/50'
                                },
                                {
                                    id: 'community',
                                    icon: <Users className="w-8 h-8 text-purple-400" />,
                                    title: t('community_title'),
                                    desc: t('community_desc'),
                                    gradient: 'from-purple-500/5 to-indigo-500/5',
                                    border: 'group-hover:border-purple-500/50'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setActiveModal(item.id as any)}
                                    className={`relative glass-premium p-8 rounded-[2rem] border border-white/5 ${item.border} transition-all duration-300 cursor-pointer group overflow-hidden`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10 mb-6 p-4 bg-slate-100 dark:bg-slate-900/40 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-slate-200 dark:group-hover:bg-slate-900/60 transition-all duration-300 shadow-inner">
                                        {item.icon}
                                    </div>
                                    <h3 className="relative z-10 text-xl font-bold mb-4 text-slate-800 dark:text-white group-hover:translate-x-1 transition-transform">{item.title}</h3>
                                    <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-relaxed mb-6 group-hover:text-slate-800 dark:group-hover:text-slate-300 line-clamp-3">{item.desc}</p>
                                    <div className="relative z-10 flex items-center text-sm font-bold text-slate-500 dark:text-white/50 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase tracking-wider">
                                        {t('learn_more')} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-40 mb-20">
                        <div className="relative rounded-[3rem] p-1 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 opacity-30 group-hover:opacity-100 transition-opacity duration-1000 animate-gradient-xy" />
                            <div className="bg-slate-50 dark:bg-[#0B0F19] rounded-[2.9rem] p-12 md:p-20 relative overflow-hidden border border-white/5 shadow-2xl transition-colors duration-500">
                                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                                <div className="grid md:grid-cols-2 gap-16 relative z-10">
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black mb-6 neon-text">{t('contact_title')}</h2>
                                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                                            {t('contact_subtitle')}
                                        </p>
                                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 glass-premium p-4 rounded-xl border border-slate-200 dark:border-white/5">
                                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                                                <Send className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">{t('email_us_at')}</div>
                                                <div className="font-bold text-slate-800 dark:text-white tracking-wide">contact@citybikes.premium</div>
                                            </div>
                                        </div>
                                    </div>

                                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert(t('contact_success')); }}>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('contact_name')}</label>
                                                <input required type="text" className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-700 text-slate-800 dark:text-white shadow-sm dark:shadow-inner" placeholder={t('contact_name')} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('contact_email')}</label>
                                                <input required type="email" className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-700 text-slate-800 dark:text-white shadow-sm dark:shadow-inner" placeholder={t('contact_email')} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('contact_message')}</label>
                                            <textarea required rows={4} className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-700 text-slate-800 dark:text-white shadow-sm dark:shadow-inner" placeholder={t('contact_message')}></textarea>
                                        </div>
                                        <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]">
                                            {t('contact_submit')}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Modals */}
            <AnimatePresence>
                {activeModal && activeModal in modalContent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" key="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveModal(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="relative bg-slate-50 dark:bg-[#0B0F19] border border-cyan-500/20 dark:border-cyan-500/30 p-8 md:p-12 rounded-[2.5rem] max-w-2xl w-full shadow-2xl dark:shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full transition-colors group z-10"
                            >
                                <X className="w-6 h-6 text-slate-400 group-hover:text-white" />
                            </button>
                            <h3 className="relative z-10 text-4xl font-black mb-8 neon-text">
                                {modalContent[activeModal].title}
                            </h3>
                            <div className="relative z-10 prose prose-invert max-w-none">
                                <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed font-light">
                                    {modalContent[activeModal].content}
                                </p>
                            </div>
                            <div className="relative z-10 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex justify-end">
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="px-10 py-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-2xl font-bold text-slate-800 dark:text-white transition-all hover:shadow-lg border border-slate-300 dark:border-white/5"
                                >
                                    {t('modal_close')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
