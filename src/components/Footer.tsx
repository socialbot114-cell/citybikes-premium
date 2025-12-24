import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-slate-50 dark:bg-[#0B0F19] pt-24 pb-12 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500 mb-4">
                            {t('app_title')}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                            {t('hero_subtitle')}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-4">{t('footer_links')}</h4>
                        <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                            <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t('footer_about')}</a></li>
                            <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t('footer_cities')}</a></li>
                            <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t('footer_api')}</a></li>
                            <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t('footer_privacy')}</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-4">{t('footer_connect')}</h4>
                        <div className="flex gap-4 text-slate-500 dark:text-slate-400">
                            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    © {new Date().getFullYear()} {t('app_title')}. {t('footer_all_rights')}
                </div>
            </div>
        </footer>
    );
};
