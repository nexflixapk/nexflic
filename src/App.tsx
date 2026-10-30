import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { DownloadSection } from './components/DownloadSection';
import { InstallGuide } from './components/InstallGuide';
import { FaqSection } from './components/FaqSection';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { QrCodeModal } from './components/QrCodeModal';

import { AppConfig, Language } from './types';
import { 
  getLocalConfig, 
  subscribeToConfig, 
  saveConfigBoth, 
  initFirebaseService 
} from './services/firebaseService';
import confetti from 'canvas-confetti';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(getLocalConfig());
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);
  
  // Modals
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);

  // Subscribe to real-time updates (Firebase / Local)
  useEffect(() => {
    const { db } = initFirebaseService();
    setIsFirebaseConnected(!!db);

    const unsubscribe = subscribeToConfig(
      (updatedConfig, fromFb) => {
        setConfig(updatedConfig);
        setIsFirebaseConnected(fromFb);
      },
      (error) => {
        console.warn('Firebase sync warning:', error);
      }
    );

    // Keyboard shortcut to open Admin Panel secretly: Ctrl + Shift + A or Alt + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSaveConfig = async (newConfig: AppConfig) => {
    const result = await saveConfigBoth(newConfig);
    setConfig(newConfig);
    setIsFirebaseConnected(result.syncedToFirebase);
    return result;
  };

  const handleTriggerDownload = (url: string) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E50914', '#ffffff', '#fbbf24', '#38bdf8']
      });
    } catch (e) {
      // Ignored
    }

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.download = `NexFlix_${config.appVersion.replace(/[^a-zA-Z0-9.-]/g, '')}.apk`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const primaryDownloadLink = config.downloadLinks.find(l => l.isPrimary) || config.downloadLinks[0];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Breaking Announcement Notice */}
      <AnnouncementBar
        announcement={config.announcement}
        currentLang={currentLang}
      />

      {/* Main Navbar */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        appName={config.appName}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          config={config}
          currentLang={currentLang}
          onOpenQrCode={() => setIsQrOpen(true)}
          onTriggerDownload={handleTriggerDownload}
          onOpenTrailer={() => setIsQrOpen(true)}
        />

        {/* Focused Download Hub with on-page QR & Direct Fast Server */}
        <DownloadSection
          links={config.downloadLinks}
          appVersion={config.appVersion}
          apkSize={config.apkSize}
          minAndroid={config.minAndroid}
          currentLang={currentLang}
          onOpenQrCode={() => setIsQrOpen(true)}
        />

        {/* Step-by-Step Installation Guide */}
        <InstallGuide
          currentLang={currentLang}
        />

        {/* Frequently Asked Questions */}
        <FaqSection
          faqs={config.faqs}
          currentLang={currentLang}
        />

        {/* Official Telegram & WhatsApp Community Links */}
        <CommunitySection
          socialLinks={config.socialLinks}
          currentLang={currentLang}
        />
      </main>

      {/* Footer with Discreet Lock */}
      <Footer
        currentLang={currentLang}
        onOpenAdmin={() => setIsAdminOpen(true)}
        appVersion={config.appVersion}
      />

      {/* Password-Protected Admin & Firebase Settings Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        isFirebaseConnected={isFirebaseConnected}
      />

      {/* Mobile QR Code Scanner Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        primaryLink={primaryDownloadLink}
        appVersion={config.appVersion}
        apkSize={config.apkSize}
        currentLang={currentLang}
      />

    </div>
  );
}
