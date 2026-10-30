import React from 'react';
import { Send, MessageCircle, BellRing, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Language } from '../types';

interface CommunitySectionProps {
  socialLinks: {
    telegram: string;
    whatsapp: string;
  };
  currentLang: Language;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  socialLinks,
  currentLang,
}) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0d0d14] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Telegram Channel Card */}
          <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-[#121c2e] via-[#101726] to-[#0c121e] border border-sky-500/20 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 blur-[90px] rounded-full pointer-events-none"></div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-6">
                <Send className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-sky-500/15 text-sky-300 border border-sky-500/30 mb-3">
                <BellRing className="w-3 h-3" />
                <span>Instant Updates</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                {currentLang === 'bn' ? 'অফিসিয়াল টেলিগ্রাম চ্যানেল' : 'Official Telegram Channel'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                {currentLang === 'bn'
                  ? 'নতুন কোনো সিনেমা রিলিজ হলে সরাসরি টেলিগ্রামে APK ও ফাইল পেয়ে যাবেন। কোনো লিঙ্ক নষ্ট হলে দ্রুত টেলিগ্রামে রিপোর্ট করুন।'
                  : 'Get instant notifications for new releases, direct APK drops without visiting websites, and fast community support.'}
              </p>
            </div>

            <a
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto self-start px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{currentLang === 'bn' ? 'টেলিগ্রামে জয়েন করুন' : 'Join Telegram Channel'}</span>
            </a>
          </div>

          {/* WhatsApp Support & Feedback */}
          <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-[#12231b] via-[#0f1d16] to-[#0c1611] border border-emerald-500/20 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none"></div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-3">
                <HeartHandshake className="w-3 h-3" />
                <span>24/7 Helpline</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                {currentLang === 'bn' ? 'হোয়াটসঅ্যাপ সাপোর্ট গ্রুপ' : 'WhatsApp Community & Support'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                {currentLang === 'bn'
                  ? 'অ্যাপ ইনস্টল করতে কোনো সমস্যা হলে বা নতুন কোনো সিনেমার রিকুয়েস্ট থাকলে আমাদের হোয়াটসঅ্যাপ গ্রুপে জানান।'
                  : 'Have issues installing the APK or want to request a movie or series? Connect with fellow streamers on WhatsApp.'}
              </p>
            </div>

            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto self-start px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{currentLang === 'bn' ? 'হোয়াটসঅ্যাপে যুক্ত হোন' : 'Join WhatsApp Group'}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
