import React from 'react';
import { Download, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  appName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  appName,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0b0f]/85 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-red-600/35 group-hover:scale-105 transition-transform duration-300">
              <span>N</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black border-2 border-[#0b0b0f] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                NEX<span className="text-red-600 drop-shadow-[0_0_15px_rgba(229,9,20,0.5)]">FLIX</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600/15 text-red-400 border border-red-500/30">
                Official
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase block">
              {currentLang === 'bn' ? 'অফিসিয়াল ডাউনলোড পোর্টাল' : 'Official Download Portal'}
            </span>
          </div>
        </a>

        {/* Clean Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
          <a href="#download" className="hover:text-red-500 transition-colors">
            {currentLang === 'bn' ? 'ডাউনলোড APK' : 'Download APK'}
          </a>
          <a href="#install" className="hover:text-red-500 transition-colors">
            {currentLang === 'bn' ? 'ইনস্টল গাইড' : 'Install Guide'}
          </a>
          <a href="#faq" className="hover:text-red-500 transition-colors">
            {currentLang === 'bn' ? 'প্রশ্নোত্তর' : 'FAQ'}
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(currentLang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-bold transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>{currentLang === 'en' ? 'বাংলা' : 'ENG'}</span>
          </button>

          {/* Download CTA Button */}
          <a
            href="#download"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-red-600/35 hover:shadow-red-600/50 transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{currentLang === 'bn' ? 'ডাউনলোড' : 'Download APK'}</span>
          </a>

        </div>

      </div>
    </header>
  );
};
