import React from 'react';
import { 
  Download, 
  Settings2, 
  PackageCheck, 
  PlaySquare, 
  Tv, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';

interface InstallGuideProps {
  currentLang: Language;
}

export const InstallGuide: React.FC<InstallGuideProps> = ({ currentLang }) => {
  const steps = [
    {
      num: '01',
      icon: <Download className="w-6 h-6 text-red-500" />,
      titleEn: 'Download the APK File',
      titleBn: 'APK ফাইল ডাউনলোড করুন',
      descEn: 'Tap the "Download APK" button on this page and wait for the download to complete in your browser or download manager.',
      descBn: 'এই পেজের "Download APK" বাটনে ট্যাপ করুন এবং আপনার ব্রাউজারে ফাইলটি সম্পূর্ণ ডাউনলোড হওয়া পর্যন্ত অপেক্ষা করুন।'
    },
    {
      num: '02',
      icon: <Settings2 className="w-6 h-6 text-amber-400" />,
      titleEn: 'Allow "Unknown Sources"',
      titleBn: '"Unknown Sources" চালু করুন',
      descEn: 'When prompted by Android, go to Settings and toggle on "Allow from this source" for Chrome or your File Manager.',
      descBn: 'অ্যান্ড্রয়েড সতর্কতা দেখালে Settings এ গিয়ে Chrome বা আপনার File Manager এর জন্য "Allow from this source" অন করে দিন।'
    },
    {
      num: '03',
      icon: <PackageCheck className="w-6 h-6 text-emerald-400" />,
      titleEn: 'Install the Application',
      titleBn: 'অ্যাপ ইনস্টল করুন',
      descEn: 'Open your Downloads folder, tap the NexFlix APK package, and press "Install". It installs within 5 seconds.',
      descBn: 'Downloads ফোল্ডার খুলে NexFlix APK ফাইলে ট্যাপ করে "Install" বাটনে চাপুন। ৫ সেকেন্ডের মধ্যে ইনস্টলেশন শেষ হবে।'
    },
    {
      num: '04',
      icon: <PlaySquare className="w-6 h-6 text-sky-400" />,
      titleEn: 'Launch & Enjoy Streaming',
      titleBn: 'ওপেন করুন ও উপভোগ করুন',
      descEn: 'Open NexFlix from your home screen. No account, sign-in, or registration needed. Instant access to movies & TV.',
      descBn: 'হোম স্ক্রিন থেকে নেক্সফ্লিক্স ওপেন করুন। কোনো রেজিস্ট্রেশন বা অ্যাকাউন্ট ছাড়াই সাথে সাথে সিনেমা দেখতে শুরু করুন।'
    }
  ];

  return (
    <section id="install" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0d14] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold mb-3">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>{currentLang === 'bn' ? 'সহজ ইনস্টলেশন নির্দেশিকা' : 'Step-by-Step Installation'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {currentLang === 'bn' ? 'কীভাবে ইনস্টল করবেন?' : 'How to Install NexFlix on Android'}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base">
            {currentLang === 'bn'
              ? 'নিচের ৪টি সাধারণ ধাপ অনুসরণ করে যেকোনো অ্যান্ড্রয়েড মোবাইল বা ট্যাবলেটে নেক্সফ্লিক্স ইনস্টল করে নিন।'
              : 'Follow these 4 simple steps to safely install NexFlix on your Android smartphone or tablet.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-[#14141e] border border-white/5 hover:border-red-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-white/20">{step.num}</span>
                </div>

                <h3 className="text-base font-extrabold text-white mb-2">
                  {currentLang === 'bn' ? step.titleBn : step.titleEn}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  {currentLang === 'bn' ? step.descBn : step.descEn}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[10px] font-bold text-red-400 uppercase tracking-wider">
                <span>{currentLang === 'bn' ? `ধাপ ${step.num}` : `Step ${step.num} of 4`}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Smart TV / Android TV Notice Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171420] to-[#121218] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {currentLang === 'bn' ? 'স্মার্ট টিভি ও অ্যান্ড্রয়েড টিভি বক্সে দেখতে চান?' : 'Want to install on Android TV or Fire TV Stick?'}
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                {currentLang === 'bn'
                  ? 'আপনার টিভিতে "Downloader" অ্যাপটি খুলে আমাদের ছোট কোড বা ডাইরেক্ট লিঙ্ক দিয়ে সরাসরি ডাউনলোড করতে পারেন।'
                  : 'Open the "Downloader" app on your TV and type our direct URL or transfer via USB flash drive.'}
              </p>
            </div>
          </div>

          <a
            href="#download"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <span>{currentLang === 'bn' ? 'ডাউনলোড লিঙ্কে যান' : 'Go to Download'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
