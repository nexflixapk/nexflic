import React from 'react';
import { ShieldCheck, Lock, ArrowUp, Send, MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
  onOpenAdmin: () => void;
  appVersion: string;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenAdmin,
  appVersion,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07070b] border-t border-white/5 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-gray-400">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-red-600/30">
                N
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                NEX<span className="text-red-600">FLIX</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed">
              {currentLang === 'bn'
                ? 'নেক্সফ্লিক্স হলো অ্যান্ড্রয়েডের জন্য সর্বশ্রেষ্ঠ মুভি ও সিরিজ স্ট্রিমিং অ্যাপ্লিকেশন। কোনো সাবস্ক্রিপশন ফি ছাড়াই সেরা কোয়ালিটিতে সিনেমা উপভোগ করুন।'
                : 'The premier free high-definition movie & series streaming app for Android devices. Featuring zero buffer speeds, dual audio tracks, and instant downloads.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              {currentLang === 'bn' ? 'দ্রুত লিঙ্ক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#download" className="hover:text-red-400 transition-colors">
                  {currentLang === 'bn' ? 'ডাউনলোড APK' : 'Download APK'}
                </a>
              </li>
              <li>
                <a href="#install" className="hover:text-red-400 transition-colors">
                  {currentLang === 'bn' ? 'ইনস্টল করার নিয়ম' : 'How to Install'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-400 transition-colors">
                  {currentLang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'FAQ & Help'}
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Version Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              {currentLang === 'bn' ? 'নিরাপত্তা ও ভার্সন' : 'Security & Build'}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="text-[10px] text-gray-400 uppercase font-semibold">Active Build</div>
                <div className="font-bold text-white flex items-center justify-between">
                  <span>NexFlix {appVersion}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Google Play Protect Safe</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal DMCA & Disclaimer */}
        <div className="pt-8 border-t border-white/5 space-y-3 text-[11px] text-gray-500 text-center leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> NexFlix is a media indexer and player. None of the video files, audio tracks, or media streams are hosted, stored, or transmitted from our servers. All links and content are scraped and aggregated from non-affiliated third-party providers on the public web.
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-400 pt-2">
            <span>© 2026 NexFlix Streaming Portal.</span>
            <span>•</span>
            <button onClick={scrollToTop} className="hover:text-white flex items-center gap-1">
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
            <span>•</span>
            {/* Discreet Admin Lock Trigger */}
            <button
              onClick={onOpenAdmin}
              className="text-gray-600 hover:text-gray-400 flex items-center gap-1 transition-colors"
              title="Admin Portal (Password Protected)"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
