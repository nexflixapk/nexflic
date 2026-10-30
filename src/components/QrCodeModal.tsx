import React from 'react';
import { X, Smartphone, Download, QrCode, ShieldCheck, Check } from 'lucide-react';
import { DownloadLink, Language } from '../types';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryLink: DownloadLink;
  appVersion: string;
  apkSize: string;
  currentLang: Language;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  primaryLink,
  appVersion,
  apkSize,
  currentLang,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(primaryLink.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Chart API / QR generator endpoint
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(primaryLink.url)}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#14141e] border border-white/10 rounded-3xl p-6 shadow-2xl text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-black text-white mb-1">
          {currentLang === 'bn' ? 'মোবাইলে ডাউনলোড করুন' : 'Scan to Download APK'}
        </h3>
        
        <p className="text-xs text-gray-400 mb-5">
          {currentLang === 'bn'
            ? 'আপনার মোবাইলের ক্যামেরা বা গুগল লেন্স দিয়ে নিচের QR কোডটি স্ক্যান করুন।'
            : 'Point your smartphone camera or Google Lens at this QR code to download instantly.'}
        </p>

        {/* QR Code Container */}
        <div className="p-3 bg-white rounded-2xl inline-block shadow-xl shadow-black/60 mb-5">
          <img
            src={qrCodeImageUrl}
            alt="NexFlix Download QR Code"
            className="w-48 h-48 mx-auto rounded-lg"
          />
        </div>

        {/* Info Pills */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-300 mb-5">
          <span className="px-2 py-0.5 rounded bg-white/5">{appVersion}</span>
          <span className="text-gray-500">•</span>
          <span className="px-2 py-0.5 rounded bg-white/5">{apkSize}</span>
          <span className="text-gray-500">•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Safe</span>
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <a
            href={primaryLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{currentLang === 'bn' ? 'ব্রাউজারে সরাসরি ডাউনলোড' : 'Direct Download in Browser'}</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <span>Copy APK Link</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
