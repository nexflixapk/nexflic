export interface DownloadLink {
  id: string;
  name: string;
  url: string;
  icon: 'download' | 'drive' | 'cloud' | 'server' | 'telegram';
  badge?: string;
  speedRating?: string;
  serverLocation?: string;
  isPrimary?: boolean;
}

export interface MovieItem {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: string;
  quality: '4K HDR' | '1080p' | '720p';
  languages: string[];
  posterUrl: string;
  backdropUrl?: string;
  category: 'trending' | 'hollywood' | 'bollywood' | 'bangla' | 'south' | 'series';
  trailerUrl?: string;
  description?: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
}

export interface AppConfig {
  appName: string;
  taglineEn: string;
  taglineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  appVersion: string;
  releaseDate: string;
  apkSize: string;
  minAndroid: string;
  totalDownloads: string;
  userRating: string;
  packageName: string;
  
  announcement: {
    enabled: boolean;
    textEn: string;
    textBn: string;
    type: 'alert' | 'update' | 'notice';
    link?: string;
  };

  downloadLinks: DownloadLink[];

  socialLinks: {
    telegram: string;
    whatsapp: string;
    facebook?: string;
    youtube?: string;
  };

  features: {
    id: string;
    titleEn: string;
    titleBn: string;
    descEn: string;
    descBn: string;
    icon: string;
  }[];

  featuredMovies: MovieItem[];
  faqs: FaqItem[];
  
  firebaseConfig?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

export type Language = 'en' | 'bn';
