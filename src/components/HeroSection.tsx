import React from 'react';
import { 
  Download, 
  QrCode, 
  ShieldCheck, 
  Star, 
  Play, 
  Sparkles, 
  Tv, 
  Film, 
  Zap, 
  CheckCircle,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { AppConfig, Language } from '../types';

interface HeroSectionProps {
  config: AppConfig;
  currentLang: Language;
  onOpenQrCode: () => void;
  onTriggerDownload: (url: string) => void;
  onOpenTrailer: (title: string, videoUrl?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  currentLang,
  onOpenQrCode,
  onTriggerDownload,
  onOpenTrailer,
}) => {
  const primaryLink = config.downloadLinks.find(l => l.isPrimary) || config.downloadLinks[0];

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (primaryLink?.url) {
      onTriggerDownload(primaryLink.url);
    }
  };

  return (
    <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
      
      {/* Background Cinematic Gradients & Light Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-red-600/15 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-rose-700/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action Triggers */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Version & Security Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-6 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white font-bold">{config.appVersion}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">{config.apkSize}</span>
              <span className="text-gray-500">•</span>
              <span className="text-amber-400 flex items-center gap-1 font-bold">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{config.userRating}</span>
              </span>
              <span className="text-gray-500 hidden sm:inline">•</span>
              <span className="text-emerald-400 hidden sm:inline font-medium">VirusTotal Clean</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
              {currentLang === 'bn' ? (
                <>
                  সিনেমা ও সিরিজের <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                    সীমাহীন রাজত্ব
                  </span>
                </>
              ) : (
                <>
                  Watch Unlimited <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(229,9,20,0.35)]">
                    Movies & Series Free
                  </span>
                </>
              )}
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
              {currentLang === 'bn' ? config.descriptionBn : config.descriptionEn}
            </p>

            {/* CTAs: Direct Download & QR Scan */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 mb-8">
              
              {/* Big Primary Download APK Button */}
              <button
                onClick={handleDownloadClick}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center sm:justify-start gap-4 border border-red-500/30"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Download className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-red-200 flex items-center gap-1.5">
                    <span>{currentLang === 'bn' ? 'সরাসরি দ্রুত ডাউনলোড' : 'Direct Fast Download'}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-lg font-black tracking-tight">
                    {currentLang === 'bn' ? 'নেক্সফ্লিক্স APK' : 'Download APK'} ({config.apkSize})
                  </div>
                </div>
              </button>

              {/* QR Code Scan Trigger */}
              <button
                onClick={onOpenQrCode}
                className="px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-200 font-bold text-sm transition-all flex items-center justify-center gap-3"
                title="Scan QR Code from Android phone to download directly"
              >
                <div className="p-2 rounded-lg bg-white/10 text-white">
                  <QrCode className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                    {currentLang === 'bn' ? 'ফোনে ইনস্টল' : 'Mobile Scan'}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {currentLang === 'bn' ? 'QR স্ক্যান করুন' : 'Scan QR Code'}
                  </div>
                </div>
              </button>

            </div>

            {/* Quick Safety Guarantees */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Virus Free & Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>No Ads & No Sign-up</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{config.minAndroid}</span>
              </div>
            </div>

            {/* Real Stats Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/5 text-center sm:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">{config.totalDownloads}</div>
                <div className="text-xs text-gray-400 font-medium">{currentLang === 'bn' ? 'মোট ডাউনলোড' : 'Total Downloads'}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">100 MB/s</div>
                <div className="text-xs text-gray-400 font-medium">{currentLang === 'bn' ? 'হাই-স্পিড সিডিএন' : 'Ultra Fast CDN'}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-red-500">4K HDR</div>
                <div className="text-xs text-gray-400 font-medium">{currentLang === 'bn' ? 'আল্ট্রা এইচডি কোয়ালিটি' : 'Ultra HD Playback'}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">0৳ / Free</div>
                <div className="text-xs text-gray-400 font-medium">{currentLang === 'bn' ? 'আজীবন ফ্রি' : '100% Free Forever'}</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive App Mockup Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-amber-500/20 blur-3xl rounded-full transform scale-90 -z-10"></div>

            {/* Floating Badges */}
            <div className="absolute -top-4 -left-4 sm:top-8 sm:-left-8 z-20 p-3 rounded-2xl bg-[#1a1a24]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3 animate-bounce [animation-duration:5s]">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-red-600/40">
                <Download className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{config.appVersion}</div>
                <div className="text-[10px] text-emerald-400 font-semibold">{config.apkSize} • 100% Virus Free</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 sm:bottom-12 sm:-right-6 z-20 p-3 rounded-2xl bg-[#1a1a24]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">0s Buffering</div>
                <div className="text-[10px] text-gray-400 font-semibold">High Speed Dhaka CDN</div>
              </div>
            </div>

            {/* Smartphone Mockup Outer Body */}
            <div className="w-[300px] sm:w-[320px] rounded-[48px] p-3 bg-gradient-to-b from-gray-700 via-gray-900 to-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(229,9,20,0.25)] border-4 border-gray-800 relative">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#151515]"></span>
                <span className="w-8 h-1 rounded-full bg-[#1e1e1e]"></span>
              </div>

              {/* Phone Screen Display */}
              <div className="w-full h-[580px] bg-[#0d0d12] rounded-[38px] overflow-hidden flex flex-col relative select-none">
                
                {/* Simulated App Top Bar */}
                <div className="pt-8 px-4 pb-3 flex items-center justify-between border-b border-white/5 bg-[#121218]/90">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xs">
                      N
                    </div>
                    <span className="font-black text-sm text-white tracking-wider">NEXFLIX</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">ONLINE</span>
                  </div>
                </div>

                {/* App Feature Card inside Phone */}
                <div className="p-4 space-y-3.5 flex-1 overflow-y-auto">
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-950/60 to-black p-4 border border-red-500/20 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 mx-auto mb-2.5 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/40">
                      N
                    </div>
                    <div className="text-sm font-black text-white">NexFlix Streamer</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{config.appVersion} • {config.apkSize}</div>
                    
                    <button
                      onClick={handleDownloadClick}
                      className="w-full mt-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/40"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Install APK Now</span>
                    </button>
                  </div>

                  {/* Feature Highlights inside Phone */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-black uppercase text-gray-400 tracking-wider">APP CAPABILITIES</div>
                    
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-gray-200">
                      <div className="w-6 h-6 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-[11px] text-white">4K UHD & 1080p Playback</div>
                        <div className="text-[9px] text-gray-400">Zero lag adaptive video player</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-gray-200">
                      <div className="w-6 h-6 rounded-lg bg-sky-600/20 text-sky-400 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-[11px] text-white">Ultra-Fast CDN Servers</div>
                        <div className="text-[9px] text-gray-400">Dhaka & Singapore low-ping nodes</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-gray-200">
                      <div className="w-6 h-6 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-[11px] text-white">100% Ad-Free & Free</div>
                        <div className="text-[9px] text-gray-400">No subscription or login required</div>
                      </div>
                    </div>
                  </div>

                  {/* CDN Server Node Status */}
                  <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>CDN Servers: Active</span>
                    </span>
                    <span className="text-white font-mono font-bold">100 MB/s</span>
                  </div>
                </div>

                {/* App Bottom Navigation Bar inside Phone */}
                <div className="py-2.5 px-4 bg-[#101017] border-t border-white/5 flex items-center justify-around text-gray-400 text-[9px] font-semibold">
                  <div className="flex flex-col items-center text-red-500">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Tv className="w-4 h-4" />
                    <span>Cast TV</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Clean</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
