import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl bg-slate-800/50 dark:bg-white/10 backdrop-blur-md border border-slate-700/50 dark:border-white/10 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                        <motion.div
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="absolute"
                        >
                            <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ y: 20, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="absolute"
                        >
                            <Moon className="w-5 h-5 text-indigo-600 drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr ${theme === 'dark' ? 'from-yellow-500/10 to-transparent' : 'from-indigo-500/10 to-transparent'}`} />
        </button>
    );
};
