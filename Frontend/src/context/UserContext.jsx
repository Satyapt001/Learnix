import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import useAuth from '../hooks/useAuth';

const UserContext = createContext();

export function UserProvider({ children }) {
    const { isAuthenticated, user: authUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile();
        } else {
            setProfile(null);
            setLoading(false);
        }
    }, [isAuthenticated]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users/me');
            setProfile(res.data.user);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data) => {
        try {
            const res = await api.put('/users/update-profile', data);
            setProfile(prev => ({ ...prev, ...res.data.user }));
            return { success: true };
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false, error: error.response?.data?.message || 'Update failed' };
        }
    };

    const updateSettings = async (data) => {
        try {
            const res = await api.put('/users/settings/update', data);
            setProfile(prev => ({ ...prev, preferences: res.data.preferences }));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateSecurity = async (data) => {
        try {
            const res = await api.put('/users/security/settings', data);
            setProfile(prev => ({ ...prev, security: res.data.security }));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    return (
        <UserContext.Provider value={{
            profile,
            loading,
            fetchProfile,
            updateProfile,
            updateSettings,
            updateSecurity
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserProfile() {
    return useContext(UserContext);
}
