import { AppConfig } from '../types';

export const defaultConfig: AppConfig = {
  appName: 'NexFlix',
  taglineEn: 'Stream & Download Unlimited Movies, Web Series & Live TV in 4K',
  taglineBn: 'সীমাহীন সিনেমা, ওয়েব সিরিজ এবং লাইভ টিভি দেখুন ও ডাউনলোড করুন সম্পূর্ণ ফ্রিতে',
  descriptionEn: 'The #1 fastest Android streaming application. Watch the latest Hollywood, Bollywood, Bangla, and South Indian movies with zero buffering, dual-audio support, and high-speed direct downloads.',
  descriptionBn: 'সর্বাধিক জনপ্রিয় এবং দ্রুতগতির অ্যান্ড্রয়েড স্ট্রিমিং অ্যাপ। বাফারিং ছাড়া যেকোনো হলিউড, বলিউড, বাংলা এবং সাউথ মুভি দেখুন ও হাই-স্পিড সার্ভার থেকে সরাসরি ডাউনলোড করুন।',
  appVersion: 'v5.4.1 (Latest)',
  releaseDate: 'October 2026',
  apkSize: '24.8 MB',
  minAndroid: 'Android 5.0 and above',
  totalDownloads: '1,500,000+',
  userRating: '4.9 ★',
  packageName: 'com.nexflix.streaming.app',
  
  announcement: {
    enabled: true,
    textEn: '🔥 NexFlix v5.4.1 Update: Ultra-Fast CDN Servers activated! Added Bangla Dubbed & 4K HDR playback support!',
    textBn: '🔥 নেক্সফ্লিক্স v5.4.1 আপডেট: নতুন আল্ট্রা-ফাস্ট সিডিএন সার্ভার যুক্ত করা হয়েছে! বাংলা ডাবিং ও 4K সাপোর্ট চালু!',
    type: 'alert',
    link: '#download'
  },

  downloadLinks: [
    {
      id: 'primary',
      name: 'Direct APK Download (Server 1)',
      url: 'https://download.nexflixapp.com/NexFlix_v5.4.1.apk',
      icon: 'download',
      badge: 'Super Fast CDN',
      speedRating: '100 MB/s',
      serverLocation: 'Singapore / Dhaka CDN',
      isPrimary: true
    },
    {
      id: 'mirror-drive',
      name: 'Google Drive High-Speed Mirror',
      url: 'https://drive.google.com/uc?export=download&id=nexflix_official_apk',
      icon: 'drive',
      badge: 'Unlimited Speed',
      speedRating: 'Google Cloud 50 MB/s',
      serverLocation: 'Global Mirror'
    },
    {
      id: 'mirror-mega',
      name: 'MEGA.nz Cloud Mirror',
      url: 'https://mega.nz/file/nexflix#apk_latest_release',
      icon: 'cloud',
      badge: 'Encrypted & Safe',
      speedRating: 'High Speed',
      serverLocation: 'EU Secure Cloud'
    },
    {
      id: 'mirror-mediafire',
      name: 'MediaFire Direct Link',
      url: 'https://www.mediafire.com/file/nexflix_v541_release.apk/file',
      icon: 'server',
      badge: 'One Click',
      speedRating: 'Fast Direct',
      serverLocation: 'US Mirror'
    },
    {
      id: 'telegram-direct',
      name: 'Download via Telegram Channel',
      url: 'https://t.me/nexflixapp',
      icon: 'telegram',
      badge: 'Instant File',
      speedRating: 'Telegram CDN',
      serverLocation: 'Official Telegram'
    }
  ],

  socialLinks: {
    telegram: 'https://t.me/nexflixapp',
    whatsapp: 'https://chat.whatsapp.com/invite/nexflixcommunity',
    facebook: 'https://facebook.com/nexflixofficial',
    youtube: 'https://youtube.com/@nexflixstreaming'
  },

  features: [
    {
      id: 'ultra-hd',
      titleEn: '4K Ultra HD & 1080p Streaming',
      titleBn: '4K আল্ট্রা এইচডি ও 1080p স্ট্রিমিং',
      descEn: 'Experience crystal-clear visual quality with adaptive bitrate technology for lag-free playback on any internet connection.',
      descBn: 'যেকোনো ইন্টারনেট স্পিডে ক্রিস্টাল ক্লিয়ার ভিজ্যুয়াল কোয়ালিটি এবং ল্যাগ-মুক্ত সিনেমা দেখার দুর্দান্ত অভিজ্ঞতা।',
      icon: 'Film'
    },
    {
      id: 'one-click-dl',
      titleEn: 'Instant 1-Click Offline Download',
      titleBn: '১-ক্লিকে অফলাইন ডাউনলোড',
      descEn: 'Download whole seasons or HD movies straight to your phone memory or SD card with resume support anytime.',
      descBn: 'এক ক্লিকে ফুল সিজন বা এইচডি সিনেমা সরাসরি মেমোরিতে ডাউনলোড করুন এবং ইন্টারনেট ছাড়াই উপভোগ করুন।',
      icon: 'Download'
    },
    {
      id: 'dual-audio',
      titleEn: 'Dual Audio & Bangla Subtitles',
      titleBn: 'ডুয়েল অডিও ও বাংলা সাবটাইটেল',
      descEn: 'Switch between English, Hindi, Bengali audio tracks, and choose from accurate multi-language subtitle tracks.',
      descBn: 'বাংলা, হিন্দি এবং ইংরেজি অডিও সহজে পরিবর্তন করুন এবং সঠিক বাংলা সাবটাইটেল সহ উপভোগ করুন।',
      icon: 'Languages'
    },
    {
      id: 'smart-tv',
      titleEn: 'Smart TV & Chromecast Cast',
      titleBn: 'স্মার্ট টিভি ও ক্রোমকাস্ট সাপোর্ট',
      descEn: 'Stream your favorite movies on the big screen with built-in Android TV, Fire TV stick, and Chromecast cast support.',
      descBn: 'স্মার্ট টিভি, অ্যান্ড্রয়েড টিভি এবং ক্রোমকাস্টের মাধ্যমে বড় পর্দায় সরাসরি কাস্ট করে সিনেমা দেখুন।',
      icon: 'Tv'
    },
    {
      id: 'ad-free',
      titleEn: 'Ad-Free Clean VIP Interface',
      titleBn: 'বিজ্ঞাপনমুক্ত ভিআইপি ইন্টারফেস',
      descEn: 'Zero annoying popup ads or redirects. Clean, modern Netflix-style dark layout optimized for mobile speed.',
      descBn: 'কোনো বিরক্তিজনক পপ-আপ বিজ্ঞাপন বা রিডাইরেক্ট নেই। দ্রুত ও মসৃণ ডার্ক থিম ইন্টারফেস।',
      icon: 'ShieldCheck'
    },
    {
      id: 'daily-updates',
      titleEn: 'Daily Fresh Movies & Live TV',
      titleBn: 'প্রতিদিন নতুন সিনেমা ও লাইভ টিভি',
      descEn: 'Updated every single day with theater prints, OTT exclusives, international releases, and live cricket sports streams.',
      descBn: 'প্রতিদিন নতুন রিলিজ হওয়া সিনেমা, ওটিটি সিরিজ এবং লাইভ ক্রিকেট ও স্পোর্টস চ্যানেল সার্বক্ষণিক আপডেট।',
      icon: 'Flame'
    }
  ],

  featuredMovies: [
    {
      id: 'm-1',
      title: 'Deadpool & Wolverine',
      genre: 'Action / Sci-Fi / Comedy',
      year: 2024,
      rating: '8.1',
      quality: '4K HDR',
      languages: ['English', 'Hindi Dub', 'Bangla Sub'],
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
      category: 'trending',
      trailerUrl: 'https://www.youtube.com/watch?v=73_1biulkYk',
      description: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool.'
    },
    {
      id: 'm-2',
      title: 'Toofan (তুফান)',
      genre: 'Action / Thriller / Crime',
      year: 2024,
      rating: '8.4',
      quality: '4K HDR',
      languages: ['Bangla Original'],
      posterUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600&auto=format&fit=crop',
      category: 'bangla',
      trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'A 90s era gangster chronicles his ruthless rise to dominate the criminal underworld of Bangladesh.'
    },
    {
      id: 'm-3',
      title: 'Stranger Things: Season 5',
      genre: 'Sci-Fi / Horror / Drama',
      year: 2025,
      rating: '8.7',
      quality: '4K HDR',
      languages: ['Dual Audio', 'Bangla Sub'],
      posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
      category: 'series',
      trailerUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
      description: 'The Hawkins crew faces the ultimate confrontation against the Upside Down and Vecna.'
    },
    {
      id: 'm-4',
      title: 'Kalki 2898 AD',
      genre: 'Sci-Fi / Mythological / Action',
      year: 2024,
      rating: '7.9',
      quality: '4K HDR',
      languages: ['Hindi', 'Telugu', 'Bangla Dub'],
      posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop',
      category: 'south',
      trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'A modern avatar of Vishnu descends to protect world civilization from dystopian evil forces.'
    },
    {
      id: 'm-5',
      title: 'Dune: Part Two',
      genre: 'Sci-Fi / Adventure',
      year: 2024,
      rating: '8.6',
      quality: '4K HDR',
      languages: ['English', 'Hindi Dub'],
      posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
      category: 'hollywood',
      trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
      description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.'
    },
    {
      id: 'm-6',
      title: 'Stree 2: Sarkate Ka Aatank',
      genre: 'Horror / Comedy',
      year: 2024,
      rating: '7.7',
      quality: '1080p',
      languages: ['Hindi Original', 'Bangla Sub'],
      posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop',
      category: 'bollywood',
      trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'The town of Chanderi is haunted once more by a headless entity abducting women.'
    },
    {
      id: 'm-7',
      title: 'Money Heist: Ultimate Saga',
      genre: 'Heist / Crime / Thriller',
      year: 2024,
      rating: '8.2',
      quality: '1080p',
      languages: ['Dual Audio', 'Bangla Sub'],
      posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
      category: 'series',
      trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'An enigmatic mastermind plans the biggest heist in recorded history.'
    },
    {
      id: 'm-8',
      title: 'Surongo (সুড়ঙ্গ)',
      genre: 'Suspense / Crime / Thriller',
      year: 2023,
      rating: '8.3',
      quality: '1080p',
      languages: ['Bangla Original'],
      posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
      category: 'bangla',
      trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'A desperate electrician digs a subterranean tunnel beneath a bank vault for love and vengeance.'
    }
  ],

  faqs: [
    {
      id: 'f-1',
      questionEn: 'Is NexFlix completely free to use?',
      questionBn: 'নেক্সফ্লিক্স কি সম্পূর্ণ ফ্রিতে ব্যবহার করা যাবে?',
      answerEn: 'Yes! NexFlix is 100% free forever. No credit card, no sign-up, and no hidden VIP membership required. All movies, series, and live TV channels are available free of cost.',
      answerBn: 'হ্যাঁ! নেক্সফ্লিক্স ১০০% ফ্রি। কোনো ক্রেডিট কার্ড, রেজিস্ট্রেশন বা লুকায়িত চার্জ লাগবে না। সকল সিনেমা, সিরিজ এবং লাইভ চ্যানেল ফ্রিতে উপভোগ করতে পারবেন।'
    },
    {
      id: 'f-2',
      questionEn: 'Is it safe to install the NexFlix APK on my Android phone?',
      questionBn: 'আমার ফোনে নেক্সফ্লিক্স APK ইনস্টল করা কি নিরাপদ?',
      answerEn: 'Yes, our APK is tested and verified through Google Play Protect and VirusTotal. We do not ask for sensitive device permissions like contacts, camera, or SMS.',
      answerBn: 'অবশ্যই! আমাদের অ্যাপটি ভাইরাসটোটাল ও গুগল প্লে প্রোটেক্ট দ্বারা সম্পূর্ণ স্ক্যান করা। এটি ক্যামেরা, কন্টাক্ট বা এসএমএস-এর মতো কোনো গোপন অনুমতি চায় না।'
    },
    {
      id: 'f-3',
      questionEn: 'How do I update to the newest version in the future?',
      questionBn: 'ভবিষ্যতে নতুন ভার্সন আসলে কীভাবে আপডেট করবো?',
      answerEn: 'NexFlix has an in-app auto-update prompt that will notify you as soon as a new version is released. Alternatively, you can always visit this website or join our official Telegram channel for direct download links.',
      answerBn: 'অ্যাপের ভেতরেই নতুন ভার্সন আসলে নোটিফিকেশন পাবেন। এছাড়াও সবসময় এই ওয়েবসাইটে এসে অথবা আমাদের অফিসিয়াল টেলিগ্রাম চ্যানেলে যোগ দিয়ে সরাসরি আপডেট ফাইল পেয়ে যাবেন।'
    },
    {
      id: 'f-4',
      questionEn: 'Can I watch movies on my Smart TV or Android TV box?',
      questionBn: 'আমি কি স্মার্ট টিভি বা টিভি বক্সে সিনেমা দেখতে পারবো?',
      answerEn: 'Yes! NexFlix supports Chromecast casting directly from your phone to your TV. You can also install the APK directly on Android TV or FireStick using the Downloader app.',
      answerBn: 'হ্যাঁ! ফোন থেকে সরাসরি ক্রোমকাস্ট দিয়ে টিভিতে কাস্ট করতে পারবেন, অথবা অ্যান্ড্রয়েড টিভি ও ফায়ারস্টিকে সরাসরি APK ইনস্টল করতে পারবেন।'
    },
    {
      id: 'f-5',
      questionEn: 'Why does Android show "Install Unknown Apps" warning?',
      questionBn: 'ইনস্টল করার সময় "Install Unknown Apps" সতর্কতা কেন দেখায়?',
      answerEn: 'Since NexFlix offers premium content and is downloaded from our official website rather than Google Play Store, Android requires you to grant permission once. Simply go to Settings -> Allow from this source.',
      answerBn: 'যেহেতু অ্যাপটি গুগল প্লে স্টোরের বাইরে ওয়েবসাইট থেকে ডাউনলোড করা হচ্ছে, তাই অ্যান্ড্রয়েড সিস্টেম এই সাধারণ পারমিশনটি চায়। সেটিংস থেকে Allow করলেই ইনস্টল সম্পন্ন হবে।'
    }
  ]
};
