import React, { useState, useEffect } from 'react';
import { X, User, Mail, Github, Twitter, Linkedin, Instagram, Shield, Smartphone, Key, Save } from 'lucide-react';
import { useUserProfile } from '../../context/UserContext';

export default function ProfileModal({ isOpen, onClose }) {
    const { profile, updateProfile, updateSecurity } = useUserProfile();
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                bio: profile.bio || '',
                socials: profile.socials || {},
                twoFactorEnabled: profile.security?.twoFactorEnabled || false
            });
        }
    }, [profile]);

    if (!isOpen) return null;

    const handleSave = async () => {
        setLoading(true);
        if (activeTab === 'security') {
            await updateSecurity({ twoFactorEnabled: formData.twoFactorEnabled });
        } else {
            await updateProfile({
                name: formData.name,
                bio: formData.bio,
                socials: formData.socials
            });
        }
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-white dark:bg-card-bg rounded-[24px] shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your public profile and security</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 dark:border-white/5 px-8">
                    {['general', 'socials', 'security'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    {profile?.name?.charAt(0) || 'U'}
                                </div>
                                <button className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
                                    Change Avatar
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-surface-hover border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        rows={4}
                                        className="w-full p-4 bg-gray-50 dark:bg-surface-hover border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'socials' && (
                        <div className="space-y-4">
                            {[
                                { key: 'github', icon: Github, label: 'GitHub' },
                                { key: 'twitter', icon: Twitter, label: 'Twitter' },
                                { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                                { key: 'instagram', icon: Instagram, label: 'Instagram' }
                            ].map(({ key, icon: Icon, label }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                                    <div className="relative">
                                        <Icon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.socials?.[key] || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                socials: { ...formData.socials, [key]: e.target.value }
                                            })}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-surface-hover border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                            placeholder={`Your ${label} username`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl flex gap-4">
                                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-blue-900 dark:text-blue-100">Account Security</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                        Protect your account with 2-factor authentication and strong passwords.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-white/10 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 dark:bg-white/10 rounded-lg">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                                        <p className="text-xs text-gray-500">Secure your account with 2FA</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setFormData({ ...formData, twoFactorEnabled: !formData.twoFactorEnabled })}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${formData.twoFactorEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.twoFactorEnabled ? 'translate-x-6' : ''
                                        }`} />
                                </button>
                            </div>

                            <button className="flex items-center gap-3 w-full p-4 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left">
                                <div className="p-2 bg-gray-100 dark:bg-white/10 rounded-lg">
                                    <Key className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                                    <p className="text-xs text-gray-500">Update your password regularly</p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-2"
                    >
                        {loading ? 'Saving...' : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
