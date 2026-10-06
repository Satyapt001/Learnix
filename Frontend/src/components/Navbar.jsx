import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { useUserProfile } from '../context/UserContext';
import { LogOut, Settings, User, Menu, X, Moon, Sun, ChevronDown, Download, Shield } from 'lucide-react';
import SettingsModal from './modals/SettingsModal';
import ProfileModal from './modals/ProfileModal';

export default function Navbar() {
    const loc = useLocation();
    const { isAuthenticated, logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { profile } = useUserProfile();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setShowDropdown(false);
        logout();
    };

    return (
        <>
            <header className="sticky top-0 z-40 border-b transition-all bg-white/80 dark:bg-[#111522]/80 backdrop-blur-md border-border-color dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform bg-primary shadow-lg shadow-primary/20">
                            L
                        </div>
                        <span className="text-xl font-bold tracking-tight text-text-primary">learnix</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink to="/courses" active={loc.pathname.startsWith('/courses')}>Courses</NavLink>
                        <NavLink to="/dashboard" active={loc.pathname.startsWith('/dashboard')}>Dashboard</NavLink>
                        <NavLink to="/ai" active={loc.pathname.startsWith('/ai')}>AI Tutor</NavLink>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full transition-all hover:bg-surface-hover text-text-secondary hover:text-text-primary"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5" />
                            ) : (
                                <Sun className="w-5 h-5" />
                            )}
                        </button>

                        <div className="h-6 w-px bg-border-color mx-1 hidden md:block" />

                        {isAuthenticated ? (
                            <div className="relative" ref={dropdownRef}>
                                {/* User Profile Button */}
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 p-1 pr-3 rounded-full transition-all hover:bg-surface-hover border border-transparent hover:border-border-color"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-sm font-medium text-text-primary hidden sm:block max-w-[100px] truncate">
                                        {user?.name?.split(' ')[0]}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-64 rounded-2xl py-2 animate-fade-in border bg-card-bg border-border-color shadow-xl ring-1 ring-black/5">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-border-color bg-surface-hover/50">
                                            <p className="text-sm font-semibold truncate text-text-primary">
                                                {user?.name || 'User'}
                                            </p>
                                            <p className="text-xs truncate text-text-secondary mt-0.5">
                                                {user?.email || ''}
                                            </p>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="p-2 space-y-1">
                                            <button
                                                onClick={() => { setShowDropdown(false); setShowProfile(true); }}
                                                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-all hover:bg-surface-hover text-text-secondary hover:text-text-primary text-left"
                                            >
                                                <User className="w-4 h-4" />
                                                My Profile
                                            </button>

                                            <Link
                                                to="/offline"
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-all hover:bg-surface-hover text-text-secondary hover:text-text-primary text-left"
                                            >
                                                <Download className="w-4 h-4" />
                                                Downloads
                                            </Link>

                                            <button
                                                onClick={() => { setShowDropdown(false); setShowSettings(true); }}
                                                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-all hover:bg-surface-hover text-text-secondary hover:text-text-primary text-left"
                                            >
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </button>
                                        </div>

                                        <div className="p-2 border-t border-border-color mt-1">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-error hover:bg-error/10 transition-all font-medium"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-surface-hover text-text-primary"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 rounded-full text-sm font-bold bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-text-secondary hover:bg-surface-hover rounded-lg"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border-color bg-foreground px-4 py-4 space-y-2 animate-slide-up">
                        <MobileNavLink to="/courses" onClick={() => setMobileMenuOpen(false)}>Courses</MobileNavLink>
                        <MobileNavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                        <MobileNavLink to="/ai" onClick={() => setMobileMenuOpen(false)}>AI Tutor</MobileNavLink>
                        <MobileNavLink to="/offline" onClick={() => setMobileMenuOpen(false)}>Offline Manager</MobileNavLink>
                    </div>
                )}
            </header>

            {/* Modals */}
            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
            <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
        </>
    );
}

function NavLink({ to, active, children }) {
    return (
        <Link
            to={to}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ to, children, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="block px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
        >
            {children}
        </Link>
    );
}
