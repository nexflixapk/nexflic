import React from 'react';
import { Flame, Bell, Sparkles, ArrowRight, X } from 'lucide-react';
import { Language } from '../types';

interface AnnouncementBarProps {
  announcement: {
    enabled: boolean;
    textEn: string;
    textBn: string;
    type: 'alert' | 'update' | 'notice';
    link?: string;
  };
  currentLang: Language;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcement, currentLang }) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (!announcement.enabled || dismissed) return null;

  const text = currentLang === 'bn' ? (announcement.textBn || announcement.textEn) : announcement.textEn;

  return (
    <div className="relative bg-gradient-to-r from-red-950/90 via-red-900/80 to-black border-b border-red-500/20 text-white px-4 py-2.5 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        
        <div className="flex items-center gap-2.5 flex-1 justify-center sm:justify-start">
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wide bg-red-600 text-white shadow-sm shadow-red-600/40 animate-pulse">
            <Flame className="w-3 h-3" />
            <span>Update</span>
          </span>
          
          <span className="text-gray-200 font-medium line-clamp-1">
            {text}
          </span>

          {announcement.link && (
            <a 
              href={announcement.link} 
              className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-bold underline underline-offset-2 ml-1 text-xs whitespace-nowrap"
            >
              <span>{currentLang === 'bn' ? 'দেখুন' : 'Check Now'}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>

        <button 
          onClick={() => setDismissed(true)} 
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
