import React from 'react';
import { Map, Settings, Info } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen w-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 text-slate-900 dark:text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-16 md:w-20 flex flex-col items-center py-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-20 transition-colors">
                <div className="mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        C
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-6">
                    <button className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all group">
                        <Map className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all group">
                        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    </button>
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50">
                        <ThemeToggle />
                    </div>
                </nav>

                <button className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all">
                    <Info className="w-6 h-6" />
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative">
                {children}
            </main>
        </div>
    );
};
