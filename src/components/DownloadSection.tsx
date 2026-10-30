import React, { useState } from 'react';
import { 
  DownloadCloud, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Zap, 
  QrCode,
  Sparkles,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DownloadLink, Language } from '../types';

interface DownloadSectionProps {
  links: DownloadLink[];
  appVersion: string;
  apkSize: string;
  minAndroid: string;
  currentLang: Language;
  onOpenQrCode: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  links,
  appVersion,
  apkSize,
  minAndroid,
  currentLang,
  onOpenQrCode,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const primary = links.find(l => l.isPrimary) || links[0];

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (link: DownloadLink) => {
    setDownloadingId(link.id);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E50914', '#ffffff', '#fbbf24', '#38bdf8']
      });
    } catch (e) {
      // Confetti fallback
    }

    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.download = `NexFlix_${appVersion.replace(/[^a-zA-Z0-9.-]/g, '')}.apk`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => {
      setDownloadingId(null);
    }, 3000);
  };

  const qrUrl = primary ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(primary.url)}&bgcolor=ffffff&color=000000&margin=8` : '';

  return (
    <section id="download" className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0b0b0f]">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold mb-4">
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>{currentLang === 'bn' ? 'অফিসিয়াল ডাউনলোড হাব' : 'Official Download Hub'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {currentLang === 'bn' ? 'নেক্সফ্লিক্স APK ডাউনলোড করুন' : 'Download NexFlix APK'}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {currentLang === 'bn' 
              ? 'হাই-স্পিড সার্ভার থেকে সরাসরি অ্যাপটি ডাউনলোড করুন। কোনো অ্যাড বা সাইন-আপ ছাড়াই ব্যবহার করুন।'
              : 'Download the official verified NexFlix application with high-speed CDN connectivity and zero buffering.'}
          </p>

          {/* Quick File Specs Info Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
            <div>
              <span className="text-gray-500 font-medium">Version: </span>
              <span className="text-white font-bold">{appVersion}</span>
            </div>
            <div className="text-gray-600">•</div>
            <div>
              <span className="text-gray-500 font-medium">File Size: </span>
              <span className="text-white font-bold">{apkSize}</span>
            </div>
            <div className="text-gray-600">•</div>
            <div>
              <span className="text-gray-500 font-medium">OS: </span>
              <span className="text-emerald-400 font-bold">{minAndroid}</span>
            </div>
            <div className="text-gray-600">•</div>
            <div>
              <span className="text-gray-500 font-medium">Status: </span>
              <span className="text-emerald-400 font-bold">100% Virus Free</span>
            </div>
          </div>
        </div>

        {/* Focused Direct Download & On-Page QR Box (Clean & Minimal) */}
        {primary && (
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-red-950/70 via-[#181116] to-[#12121c] border-2 border-red-500/40 shadow-2xl shadow-red-950/50 flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-red-600/40">
                <Sparkles className="w-3 h-3" />
                <span>{currentLang === 'bn' ? 'সর্বশেষ ভার্সন • রিকমেন্ডেড' : 'RECOMMENDED • LATEST BUILD'}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white">
                NexFlix APK {appVersion}
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                {currentLang === 'bn'
                  ? 'সরাসরি আল্ট্রা-ফাস্ট সিডিএন সার্ভার থেকে সম্পূর্ণ ফ্রিতে নামিয়ে নিন। কোনো রেজিস্ট্রেশন বা লুকায়িত চার্জ নেই।'
                  : 'Download the official NexFlix installer. 100% clean package verified by Google Play Protect.'}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                <button
                  onClick={() => handleDownload(primary)}
                  disabled={downloadingId === primary.id}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/40 transform hover:-translate-y-0.5 transition-all flex items-center gap-3"
                >
                  <DownloadCloud className="w-5 h-5 animate-bounce" />
                  <span>
                    {downloadingId === primary.id
                      ? (currentLang === 'bn' ? 'ডাউনলোড হচ্ছে...' : 'Starting...')
                      : (currentLang === 'bn' ? 'সরাসরি ডাউনলোড করুন' : 'DOWNLOAD APK NOW') + ` (${apkSize})`}
                  </span>
                </button>

                <button
                  onClick={() => handleCopy('primary-main', primary.url)}
                  className="px-4 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-2 border border-white/10"
                  title="Copy direct download link (for IDM or 1DM)"
                >
                  {copiedId === 'primary-main' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* Safety notice */}
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-gray-400 pt-1">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Google Play Protect Safe</span>
                </span>
                <span>•</span>
                <span>Direct High-Speed CDN</span>
              </div>
            </div>

            {/* Direct On-Page QR Code Box */}
            <div className="flex flex-col items-center p-5 rounded-3xl bg-black/70 border border-white/10 text-center flex-shrink-0 shadow-2xl">
              <div className="p-2.5 bg-white rounded-2xl shadow-lg mb-3">
                <img
                  src={qrUrl}
                  alt="NexFlix Direct APK Download QR Code"
                  className="w-36 h-36 rounded-xl"
                />
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-red-500" />
                <span>{currentLang === 'bn' ? 'মোবাইলে স্ক্যান করুন' : 'Scan to Download'}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {currentLang === 'bn' ? 'ক্যামেরা দিয়ে স্ক্যান করলেই ডাউনলোড' : 'Point camera to download'}
              </div>
            </div>

          </div>
        )}

      </div>

    </section>
  );
};
