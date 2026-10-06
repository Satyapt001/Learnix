import React, { useState } from 'react';
import { X, Moon, Sun, Monitor, Bell, Globe, Shield, Trash2, RefreshCw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUserProfile } from '../../context/UserContext';

export default function SettingsModal({ isOpen, onClose }) {
    const { theme, setThemeMode } = useTheme();
    const { profile, updateSettings } = useUserProfile();
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleToggleNotification = async () => {
        setLoading(true);
        await updateSettings({ notifications: !profile?.preferences?.notifications });
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white dark:bg-card-bg rounded-[20px] shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden animate-float">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Theme Section */}
                    <section>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Appearance</h3>
                        <div className="bg-gray-50 dark:bg-surface-hover rounded-2xl p-1 flex">
                            {['light', 'dark', 'system'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setThemeMode(mode)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all ${theme === mode
                                            ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {mode === 'light' && <Sun className="w-4 h-4" />}
                                    {mode === 'dark' && <Moon className="w-4 h-4" />}
                                    {mode === 'system' && <Monitor className="w-4 h-4" />}
                                    <span className="capitalize">{mode}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Preferences Section */}
                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Preferences</h3>

                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Notifications</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Push & Email alerts</p>
                                </div>
                            </div>
                            <button
                                onClick={handleToggleNotification}
                                className={`w-12 h-6 rounded-full transition-colors relative ${profile?.preferences?.notifications ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${profile?.preferences?.notifications ? 'translate-x-6' : ''
                                    }`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Language</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">English (US)</p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">EN</span>
                        </div>
                    </section>

                    {/* Danger Zone */}
                    <section className="pt-4 border-t border-gray-100 dark:border-white/5">
                        <button className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-sm font-medium">
                            <Trash2 className="w-5 h-5" />
                            Delete Account
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
