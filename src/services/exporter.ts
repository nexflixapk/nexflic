import { AppConfig } from '../types';

export function generateStandaloneIndexHtml(config: AppConfig, firebaseConfig?: Record<string, string> | null): string {
  const fbConfigJson = JSON.stringify(firebaseConfig || {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
  }, null, 2);

  const initialConfigJson = JSON.stringify(config);
  const primaryUrl = config.downloadLinks[0]?.url || 'https://download.nexflixapp.com/NexFlix_latest.apk';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.appName} - ${config.taglineEn}</title>
  <meta name="description" content="${config.descriptionEn}">
  <meta property="og:title" content="${config.appName} - Official Download Portal">
  <meta property="og:description" content="${config.descriptionEn}">
  <meta property="og:type" content="website">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              red: '#E50914',
              redHover: '#B80710',
              dark: '#141414',
              card: '#1F1F1F',
              border: '#2E2E2E'
            }
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #0b0b0f;
      color: #f3f4f6;
    }
  </style>
</head>
<body class="min-h-screen bg-[#0b0b0f] text-gray-100 antialiased selection:bg-red-600 selection:text-white pb-16">
  
  <!-- Announcement Header -->
  <div id="announcement-banner" class="bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80 border-b border-red-500/20 px-4 py-2 text-center text-xs sm:text-sm font-medium text-red-200 flex items-center justify-center gap-2">
    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white animate-pulse">LATEST</span>
    <span id="announcement-text">${config.announcement.textEn}</span>
  </div>

  <!-- Navbar -->
  <nav class="sticky top-0 z-40 backdrop-blur-xl bg-[#0b0b0f]/80 border-b border-white/5 px-4 sm:px-8 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-red-600/30">
          N
        </div>
        <div>
          <span class="text-2xl font-black tracking-wider text-white">NEX<span class="text-red-600">FLIX</span></span>
          <span class="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">OFFICIAL</span>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <div id="fb-status-badge" class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Live Sync</span>
        </div>
        <a href="#download" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-2">
          <span>Download APK</span>
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="relative pt-12 pb-16 px-4 sm:px-8 overflow-hidden text-center">
    <div class="max-w-5xl mx-auto relative z-10">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-6 backdrop-blur">
        <span class="w-2 h-2 rounded-full bg-green-500"></span>
        <span id="hero-version">${config.appVersion}</span>
        <span class="text-gray-500">•</span>
        <span id="hero-size">${config.apkSize}</span>
        <span class="text-gray-500">•</span>
        <span class="text-emerald-400">100% Virus Free</span>
      </div>

      <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
        NexFlix Official <br/>
        <span class="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">Stream & Download APK</span>
      </h1>

      <p id="hero-desc" class="max-w-2xl mx-auto text-gray-400 text-sm sm:text-lg mb-8 leading-relaxed">
        ${config.descriptionEn}
      </p>

      <!-- Primary Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
        <a id="main-download-btn" href="${primaryUrl}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-base shadow-xl shadow-red-600/40 hover:shadow-red-600/60 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
          <div class="text-left">
            <div class="text-[10px] uppercase font-bold tracking-wider text-red-200">Direct Fast CDN</div>
            <div class="text-sm font-black">Download APK (<span id="btn-size">${config.apkSize}</span>)</div>
          </div>
        </a>
        <a href="#download" class="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-bold text-sm transition-all flex items-center justify-center gap-2">
          <span>All Mirrors</span>
        </a>
      </div>

      <!-- Verified Badges -->
      <div class="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
        <span>✓ Google Play Protect Verified</span>
        <span>✓ No Ads / Zero Buffering</span>
        <span>✓ Supports Android 5.0+</span>
      </div>
    </div>
  </header>

  <!-- Download Section with On-Page QR Code -->
  <section id="download" class="max-w-5xl mx-auto px-4 sm:px-8 py-10">
    
    <!-- Featured Direct Download & QR Code Box -->
    <div class="mb-10 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-red-950/70 via-[#181116] to-[#12121c] border-2 border-red-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex-1 text-center md:text-left space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
          <span>RECOMMENDED BUILD</span>
        </div>
        <h3 class="text-2xl sm:text-3xl font-black text-white">
          Download NexFlix APK (<span id="box-version">${config.appVersion}</span>)
        </h3>
        <p class="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl">
          Direct high-speed download link for Android devices. Click the button below or scan the QR code with your mobile camera.
        </p>
        <div class="pt-2">
          <a id="featured-download-btn" href="${primaryUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/40">
            <span>DOWNLOAD APK NOW</span> (<span id="featured-size">${config.apkSize}</span>)
          </a>
        </div>
      </div>

      <div class="flex flex-col items-center p-4 rounded-2xl bg-black/60 border border-white/10 text-center flex-shrink-0">
        <div class="p-2 bg-white rounded-xl shadow-lg mb-2">
          <img id="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(primaryUrl)}&bgcolor=ffffff&color=000000&margin=8" alt="Download QR Code" class="w-32 h-32 rounded-lg" />
        </div>
        <div class="text-xs font-bold text-white">Scan from Mobile</div>
        <div class="text-[9px] text-gray-400 mt-0.5">Android 5.0 and above</div>
      </div>
    </div>

    </div>
  </section>

  <!-- App Technical Specs Table -->
  <section class="max-w-5xl mx-auto px-4 sm:px-8 py-8">
    <div class="rounded-3xl bg-[#13131c] border border-white/5 p-6 sm:p-8">
      <h3 class="text-base font-black text-white mb-4">Application Details</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
        <div class="p-3 rounded-2xl bg-white/5"><span class="text-gray-400 block text-[10px]">App Name</span><span class="text-white font-bold">NexFlix</span></div>
        <div class="p-3 rounded-2xl bg-white/5"><span class="text-gray-400 block text-[10px]">Version</span><span id="spec-version" class="text-white font-bold">${config.appVersion}</span></div>
        <div class="p-3 rounded-2xl bg-white/5"><span class="text-gray-400 block text-[10px]">Size</span><span id="spec-size" class="text-white font-bold">${config.apkSize}</span></div>
        <div class="p-3 rounded-2xl bg-white/5"><span class="text-gray-400 block text-[10px]">OS</span><span class="text-emerald-400 font-bold">${config.minAndroid}</span></div>
        <div class="p-3 rounded-2xl bg-white/5"><span class="text-gray-400 block text-[10px]">Security</span><span class="text-emerald-400 font-bold">Virus Free</span></div>
        <div class="p-3 rounded-2xl bg-white/5"><span class="text-gray-400 block text-[10px]">Price</span><span class="text-white font-bold">100% Free</span></div>
      </div>
    </div>
  </section>

  <!-- Telegram Join Banner -->
  <section class="max-w-5xl mx-auto px-4 sm:px-8 py-6">
    <div class="rounded-3xl p-6 bg-gradient-to-r from-blue-900/40 via-sky-900/20 to-blue-950/40 border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <h3 class="text-lg font-bold text-white">Join Official Telegram Channel</h3>
        <p class="text-xs text-gray-300">Get direct APK drops, update notifications, and request features.</p>
      </div>
      <a id="telegram-link" href="${config.socialLinks.telegram}" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-lg transition-all">
        Join Channel
      </a>
    </div>
  </section>

  <!-- How to Install -->
  <section class="max-w-5xl mx-auto px-4 sm:px-8 py-8">
    <div class="text-center mb-8">
      <h2 class="text-xl sm:text-3xl font-extrabold text-white mb-2">How to Install NexFlix APK</h2>
      <p class="text-xs text-gray-400">4 quick steps on your Android device</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 rounded-2xl bg-[#141419] border border-white/5 text-center">
        <div class="w-8 h-8 rounded-full bg-red-600/20 text-red-500 font-black text-xs flex items-center justify-center mx-auto mb-2">1</div>
        <h4 class="font-bold text-white text-xs mb-1">Download APK</h4>
        <p class="text-[11px] text-gray-400">Click the Download APK button above.</p>
      </div>
      <div class="p-4 rounded-2xl bg-[#141419] border border-white/5 text-center">
        <div class="w-8 h-8 rounded-full bg-red-600/20 text-red-500 font-black text-xs flex items-center justify-center mx-auto mb-2">2</div>
        <h4 class="font-bold text-white text-xs mb-1">Allow Unknown</h4>
        <p class="text-[11px] text-gray-400">Enable "Allow from this source" in Settings.</p>
      </div>
      <div class="p-4 rounded-2xl bg-[#141419] border border-white/5 text-center">
        <div class="w-8 h-8 rounded-full bg-red-600/20 text-red-500 font-black text-xs flex items-center justify-center mx-auto mb-2">3</div>
        <h4 class="font-bold text-white text-xs mb-1">Install APK</h4>
        <p class="text-[11px] text-gray-400">Open Downloads folder and tap install.</p>
      </div>
      <div class="p-4 rounded-2xl bg-[#141419] border border-white/5 text-center">
        <div class="w-8 h-8 rounded-full bg-red-600/20 text-red-500 font-black text-xs flex items-center justify-center mx-auto mb-2">4</div>
        <h4 class="font-bold text-white text-xs mb-1">Enjoy Watching</h4>
        <p class="text-[11px] text-gray-400">Launch NexFlix and enjoy 100% free streaming!</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="max-w-5xl mx-auto px-4 sm:px-8 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
    <p class="mb-2">© 2026 NexFlix Streaming Portal. All rights reserved.</p>
  </footer>

  <!-- Firebase Script Integration -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

    let currentConfig = ${initialConfigJson};
    const firebaseConfig = ${fbConfigJson};

    function renderUI(cfg) {
      if (!cfg) return;
      if (cfg.announcement && cfg.announcement.textEn) {
        document.getElementById('announcement-text').textContent = cfg.announcement.textEn;
      }
      if (cfg.appVersion) {
        document.getElementById('hero-version').textContent = cfg.appVersion;
        const boxVer = document.getElementById('box-version');
        if (boxVer) boxVer.textContent = cfg.appVersion;
        const specVer = document.getElementById('spec-version');
        if (specVer) specVer.textContent = cfg.appVersion;
      }
      if (cfg.apkSize) {
        document.getElementById('hero-size').textContent = cfg.apkSize;
        const btnSize = document.getElementById('btn-size');
        if (btnSize) btnSize.textContent = cfg.apkSize;
        const featSize = document.getElementById('featured-size');
        if (featSize) featSize.textContent = cfg.apkSize;
        const specSize = document.getElementById('spec-size');
        if (specSize) specSize.textContent = cfg.apkSize;
      }
      if (cfg.downloadLinks && cfg.downloadLinks.length > 0) {
        const primary = cfg.downloadLinks[0];
        const mainBtn = document.getElementById('main-download-btn');
        if (mainBtn && primary) mainBtn.href = primary.url;
        const featBtn = document.getElementById('featured-download-btn');
        if (featBtn && primary) featBtn.href = primary.url;

        const qrImg = document.getElementById('qr-image');
        if (qrImg && primary) {
          qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(primary.url) + '&bgcolor=ffffff&color=000000&margin=8';
        }
      }

      if (cfg.socialLinks && cfg.socialLinks.telegram) {
        const tgLink = document.getElementById('telegram-link');
        if (tgLink) tgLink.href = cfg.socialLinks.telegram;
      }
    }

    renderUI(currentConfig);

    if (firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY") {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const docRef = doc(db, "nexflix_config", "landing_page");

        onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            currentConfig = { ...currentConfig, ...docSnap.data() };
            renderUI(currentConfig);
            const badge = document.getElementById('fb-status-badge');
            if (badge) {
              badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span><span>Firebase Live</span>';
            }
          }
        });
      } catch (err) {
        console.warn("Firebase init failed:", err);
      }
    }
  </script>
</body>
</html>`;
}
