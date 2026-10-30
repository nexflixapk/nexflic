import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot, Firestore } from 'firebase/firestore';
import { AppConfig } from '../types';
import { defaultConfig } from '../data/defaultConfig';

const LOCAL_STORAGE_CONFIG_KEY = 'nexflix_app_config';
const LOCAL_STORAGE_FIREBASE_SETTINGS_KEY = 'nexflix_firebase_settings';
const FIRESTORE_COLLECTION = 'nexflix_config';
const FIRESTORE_DOC = 'landing_page';

let activeApp: FirebaseApp | null = null;
let activeDb: Firestore | null = null;

export interface FirebaseConnectionStatus {
  isConnected: boolean;
  isCustomConfig: boolean;
  projectId?: string;
  lastSyncedAt?: string;
  error?: string;
}

export function getStoredFirebaseConfig(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_FIREBASE_SETTINGS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse saved Firebase config', err);
    return null;
  }
}

export function saveStoredFirebaseConfig(config: Record<string, string> | null): void {
  try {
    if (!config) {
      localStorage.removeItem(LOCAL_STORAGE_FIREBASE_SETTINGS_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_FIREBASE_SETTINGS_KEY, JSON.stringify(config));
    }
  } catch (err) {
    console.error('Failed to save Firebase config to storage', err);
  }
}

export function initFirebaseService(customConfig?: Record<string, string> | null): { db: Firestore | null; app: FirebaseApp | null } {
  const configToUse = customConfig || getStoredFirebaseConfig();
  
  if (!configToUse || !configToUse.apiKey || !configToUse.projectId) {
    activeApp = null;
    activeDb = null;
    return { db: null, app: null };
  }

  try {
    const existingApps = getApps();
    const appName = 'nexflixAppInstance';
    const current = existingApps.find(a => a.name === appName) || (existingApps.length === 0 ? initializeApp(configToUse, appName) : existingApps[0]);
    activeApp = current;
    activeDb = getFirestore(current);
    return { db: activeDb, app: activeApp };
  } catch (error) {
    console.warn('Firebase initialization notice:', error);
    return { db: null, app: null };
  }
}

export function getLocalConfig(): AppConfig {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultConfig, ...parsed };
    }
  } catch (e) {
    console.warn('Error reading from localStorage', e);
  }
  return defaultConfig;
}

export function saveLocalConfig(config: AppConfig): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Error saving to localStorage', e);
  }
}

export async function fetchRemoteConfig(): Promise<{ config: AppConfig; fromFirebase: boolean }> {
  const { db } = initFirebaseService();
  if (!db) {
    return { config: getLocalConfig(), fromFirebase: false };
  }

  try {
    const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as Partial<AppConfig>;
      const merged = { ...defaultConfig, ...data };
      saveLocalConfig(merged);
      return { config: merged, fromFirebase: true };
    } else {
      // Initialize the document with the default config if empty
      const local = getLocalConfig();
      await setDoc(docRef, { ...local, updatedAt: new Date().toISOString() });
      return { config: local, fromFirebase: true };
    }
  } catch (error) {
    console.warn('Firestore fetch failed, using local cache:', error);
    return { config: getLocalConfig(), fromFirebase: false };
  }
}

export function subscribeToConfig(
  onUpdate: (config: AppConfig, fromFirebase: boolean) => void,
  onError?: (err: Error) => void
): () => void {
  const { db } = initFirebaseService();
  
  if (!db) {
    onUpdate(getLocalConfig(), false);
    return () => {};
  }

  try {
    const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const remoteData = docSnap.data() as Partial<AppConfig>;
          const merged = { ...defaultConfig, ...remoteData };
          saveLocalConfig(merged);
          onUpdate(merged, true);
        } else {
          onUpdate(getLocalConfig(), true);
        }
      },
      (error) => {
        console.warn('Firestore onSnapshot listener error:', error);
        if (onError) onError(error);
        onUpdate(getLocalConfig(), false);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Failed to attach Firebase snapshot listener:', err);
    onUpdate(getLocalConfig(), false);
    return () => {};
  }
}

export async function saveConfigBoth(newConfig: AppConfig): Promise<{ success: boolean; syncedToFirebase: boolean; error?: string }> {
  // Always update locally first for instant snappy response
  saveLocalConfig(newConfig);

  const { db } = initFirebaseService();
  if (!db) {
    return { success: true, syncedToFirebase: false };
  }

  try {
    const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
    await setDoc(docRef, {
      ...newConfig,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return { success: true, syncedToFirebase: true };
  } catch (error: any) {
    console.error('Failed to sync to Firestore:', error);
    return {
      success: true, // Local succeeded
      syncedToFirebase: false,
      error: error?.message || 'Failed to write to Firebase Firestore'
    };
  }
}
