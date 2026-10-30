import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Flame, 
  Link2, 
  Database, 
  FileCode, 
  Check, 
  Copy, 
  Download, 
  RefreshCw, 
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  Send,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { AppConfig, DownloadLink } from '../types';
import { 
  getStoredFirebaseConfig, 
  saveStoredFirebaseConfig, 
  initFirebaseService 
} from '../services/firebaseService';
import { generateStandaloneIndexHtml } from '../services/exporter';

const ADMIN_PASSWORD_KEY = 'nexflix_admin_master_password';
const DEFAULT_PASSWORD = 'nexflix@admin2026';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSaveConfig: (newConfig: AppConfig) => Promise<{ success: boolean; syncedToFirebase: boolean; error?: string }>;
  isFirebaseConnected: boolean;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  isFirebaseConnected,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // New Password State
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'links' | 'announcement' | 'firebase' | 'export' | 'security'>('links');
  
  // Working copy of config
  const [formData, setFormData] = useState<AppConfig>(config);
  
  // Working copy of Firebase Config
  const [fbConfig, setFbConfig] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  });

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Initialize form when opening
  useEffect(() => {
    if (isOpen) {
      setFormData(config);
      const savedFb = getStoredFirebaseConfig();
      if (savedFb) {
        setFbConfig({
          apiKey: savedFb.apiKey || '',
          authDomain: savedFb.authDomain || '',
          projectId: savedFb.projectId || '',
          storageBucket: savedFb.storageBucket || '',
          messagingSenderId: savedFb.messagingSenderId || '',
          appId: savedFb.appId || '',
        });
      }
      setStatusMessage(null);
      setAuthError(null);
      setPasswordInput('');
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const getStoredPassword = (): string => {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = getStoredPassword();
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('Incorrect password! Please enter the valid security key.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    onClose();
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordChangeMsg('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordChangeMsg('Passwords do not match.');
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    setPasswordChangeMsg('✓ Admin master password successfully updated!');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLinkChange = (id: string, newUrl: string) => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: prev.downloadLinks.map(link => 
        link.id === id ? { ...link, url: newUrl } : link
      )
    }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setStatusMessage(null);

    // If Firebase settings were modified, save them first
    if (fbConfig.apiKey && fbConfig.projectId) {
      saveStoredFirebaseConfig(fbConfig);
      initFirebaseService(fbConfig);
    }

    try {
      const result = await onSaveConfig(formData);
      if (result.syncedToFirebase) {
        setStatusMessage({
          text: '✓ Download links and configuration successfully synced to Firebase Firestore!',
          type: 'success'
        });
      } else {
        setStatusMessage({
          text: '✓ Settings saved in Local Storage. Connect Firebase in the Firebase tab for real-time remote sync.',
          type: 'info'
        });
      }
    } catch (err: any) {
      setStatusMessage({
        text: `Error saving: ${err.message || 'Unknown error'}`,
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadStandaloneHtml = () => {
    const htmlCode = generateStandaloneIndexHtml(formData, fbConfig.apiKey ? fbConfig : null);
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyStandaloneHtml = () => {
    const htmlCode = generateStandaloneIndexHtml(formData, fbConfig.apiKey ? fbConfig : null);
    navigator.clipboard.writeText(htmlCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // IF NOT AUTHENTICATED -> SHOW STRICT PASSWORD GATE!
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <div className="relative w-full max-w-md bg-[#13131c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-black text-white mb-1">
            Admin Verification Required
          </h3>
          <p className="text-xs text-gray-400 mb-6">
            Unauthorized access is strictly forbidden. Please enter the master security key to unlock this panel.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter Admin Password..."
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-white/5 text-[11px] text-gray-500">
            <span>Default Master Key: </span>
            <code className="text-red-400 bg-white/5 px-2 py-0.5 rounded font-mono font-bold select-all">{DEFAULT_PASSWORD}</code>
            <p className="text-[10px] text-gray-500 mt-1">You can change this password after unlocking under the Security tab.</p>
          </div>

        </div>
      </div>
    );
  }

  // AUTHENTICATED -> RENDER FULL ADMIN DASHBOARD
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#12121a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#171722] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">NexFlix Secure Admin</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Manage live download links, notice alerts, and Firebase cloud database
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
              title="Lock Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock & Exit</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/5 bg-[#14141e] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('links')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'links'
                ? 'border-red-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Link2 className="w-4 h-4 text-red-500" />
            <span>Download Links & APK</span>
          </button>

          <button
            onClick={() => setActiveTab('announcement')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'announcement'
                ? 'border-red-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Notice Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('firebase')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'firebase'
                ? 'border-red-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Firebase Firestore</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'security'
                ? 'border-red-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Lock className="w-4 h-4 text-rose-400" />
            <span>Security & Password</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'export'
                ? 'border-red-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-sky-400" />
            <span>Export index.html</span>
          </button>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className={`px-6 py-3 text-xs font-semibold flex items-center gap-2 border-b ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
              : statusMessage.type === 'error'
              ? 'bg-red-950/60 text-red-300 border-red-500/30'
              : 'bg-blue-950/60 text-blue-300 border-blue-500/30'
          }`}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: DOWNLOAD LINKS & APK DETAILS */}
          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    App Version
                  </label>
                  <input
                    type="text"
                    value={formData.appVersion}
                    onChange={(e) => setFormData({ ...formData, appVersion: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-red-500"
                    placeholder="e.g. v5.4.1 (Latest)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    File Size
                  </label>
                  <input
                    type="text"
                    value={formData.apkSize}
                    onChange={(e) => setFormData({ ...formData, apkSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-red-500"
                    placeholder="e.g. 24.8 MB"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Minimum Android OS
                  </label>
                  <input
                    type="text"
                    value={formData.minAndroid}
                    onChange={(e) => setFormData({ ...formData, minAndroid: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-red-500"
                    placeholder="e.g. Android 5.0+"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-red-500" />
                  <span>Primary APK Download Link</span>
                </h3>
                
                <div className="space-y-4">
                  {formData.downloadLinks.slice(0, 1).map((link) => (
                    <div key={link.id} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-white flex items-center gap-2">
                          <span>{link.name}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-red-600 text-white uppercase">
                            Direct Fast CDN
                          </span>
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">Primary APK Link</span>
                      </div>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleLinkChange(link.id, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500"
                        placeholder="https://download.nexflixapp.com/NexFlix_latest.apk"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/5">
                <h3 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Social & Community Links</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Telegram Channel Link
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.telegram}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, telegram: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-red-500"
                      placeholder="https://t.me/nexflixapp"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      WhatsApp Community Link
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.whatsapp}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, whatsapp: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-red-500"
                      placeholder="https://chat.whatsapp.com/..."
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ANNOUNCEMENT BAR */}
          {activeTab === 'announcement' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div>
                  <h4 className="font-bold text-white text-sm">Enable Announcement Notice Banner</h4>
                  <p className="text-xs text-gray-400">Display an urgent notice or update notification at the top of the landing page.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.announcement.enabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      announcement: { ...formData.announcement, enabled: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Announcement Notice Text
                </label>
                <textarea
                  rows={3}
                  value={formData.announcement.textEn}
                  onChange={(e) => setFormData({
                    ...formData,
                    announcement: { ...formData.announcement, textEn: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-red-500"
                  placeholder="e.g. NexFlix v5.4.1 is live! Ultra-fast CDN servers activated..."
                />
              </div>
            </div>
          )}

          {/* TAB 3: FIREBASE CONNECTION */}
          {activeTab === 'firebase' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-amber-950/20 to-black border border-red-500/20">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      How to connect your Firebase Firestore database?
                    </h4>
                    <ol className="text-xs text-gray-300 list-decimal list-inside space-y-1 mt-2">
                      <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-red-400 underline font-bold">Firebase Console</a> and create a free project.</li>
                      <li>Enable Cloud Firestore database in test mode.</li>
                      <li>Under Project Settings &gt; Your apps &gt; Web, copy the configuration credentials into the inputs below and click "Save & Sync".</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    API Key (apiKey)
                  </label>
                  <input
                    type="text"
                    value={fbConfig.apiKey}
                    onChange={(e) => setFbConfig({ ...fbConfig, apiKey: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500"
                    placeholder="AIzaSy..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Project ID (projectId)
                  </label>
                  <input
                    type="text"
                    value={fbConfig.projectId}
                    onChange={(e) => setFbConfig({ ...fbConfig, projectId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500"
                    placeholder="nexflix-app"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Auth Domain (authDomain)
                  </label>
                  <input
                    type="text"
                    value={fbConfig.authDomain}
                    onChange={(e) => setFbConfig({ ...fbConfig, authDomain: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500"
                    placeholder="nexflix-app.firebaseapp.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    App ID (appId)
                  </label>
                  <input
                    type="text"
                    value={fbConfig.appId}
                    onChange={(e) => setFbConfig({ ...fbConfig, appId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500"
                    placeholder="1:123456789:web:abcdef"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & CHANGE PASSWORD */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <h4 className="text-sm font-bold text-white">Change Admin Password</h4>
                </div>
                <p className="text-xs text-gray-400">
                  Set a private, strong master password to prevent anyone else from entering this control panel.
                </p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    New Admin Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new master password..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                {passwordChangeMsg && (
                  <div className={`p-3 rounded-xl text-xs font-semibold ${
                    passwordChangeMsg.startsWith('✓') 
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-red-950/60 text-red-300 border border-red-500/30'
                  }`}>
                    {passwordChangeMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: EXPORT STANDALONE INDEX.HTML */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#141824] border border-sky-500/20">
                <div className="flex items-start gap-3">
                  <FileCode className="w-6 h-6 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      সম্পূর্ণ স্বয়ংসম্পূর্ণ Standalone index.html ফাইল
                    </h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      এটি একটি একক <code>index.html</code> ফাইল যা কোনো বিল্ড প্রসেস ছাড়াই সরাসরি 
                      <strong> Blogger / Blogspot</strong> (`nexflixapp.blogspot.com`), <strong>GitHub Pages</strong>, 
                      বা যেকোনো হোস্টিং এ পেস্ট করলেই চলবে। এতে ফায়ারবেস স্ক্রিপ্ট এমবেড করা আছে।
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleDownloadStandaloneHtml}
                  className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download index.html File</span>
                </button>

                <button
                  onClick={handleCopyStandaloneHtml}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-2 border border-white/10"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy index.html Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-[#14141e] border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-400">
            {isFirebaseConnected ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Firestore Live Connected
              </span>
            ) : (
              <span className="text-amber-400">Firebase: Local Cache Mode</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-black shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save & Sync to Firebase</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
