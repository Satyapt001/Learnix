import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import useAuth from '../hooks/useAuth';

const OfflineContext = createContext();

export function OfflineProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [downloads, setDownloads] = useState([]);
    const [storageUsage, setStorageUsage] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            fetchDownloads();
        } else {
            setDownloads([]);
        }
    }, [isAuthenticated]);

    const fetchDownloads = async () => {
        try {
            const res = await api.get('/offline');
            setDownloads(res.data.data);
        } catch (error) {
            console.error('Error fetching downloads:', error);
        }
    };

    const addToOffline = async (resource) => {
        try {
            // Optimistic update
            const tempId = Date.now().toString();
            const newDownload = {
                ...resource,
                status: 'downloading',
                progress: 0,
                _id: tempId
            };
            setDownloads(prev => [newDownload, ...prev]);

            // Simulate download progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setDownloads(prev => prev.map(d =>
                    d._id === tempId ? { ...d, progress } : d
                ));
                if (progress >= 100) clearInterval(interval);
            }, 500);

            // Call API
            const res = await api.post('/offline/add', resource);

            // Replace temp with real data
            setDownloads(prev => prev.map(d =>
                d._id === tempId ? { ...res.data.data, status: 'completed', progress: 100 } : d
            ));

            return { success: true };
        } catch (error) {
            console.error('Error adding download:', error);
            // Remove optimistic update
            fetchDownloads();
            return { success: false, error: error.message };
        }
    };

    const removeDownload = async (id) => {
        try {
            setDownloads(prev => prev.filter(d => d._id !== id));
            await api.delete(`/offline/remove/${id}`);
        } catch (error) {
            console.error('Error removing download:', error);
            fetchDownloads();
        }
    };

    const clearAllDownloads = async () => {
        try {
            setDownloads([]);
            await api.delete('/offline/clear');
        } catch (error) {
            console.error('Error clearing downloads:', error);
        }
    };

    return (
        <OfflineContext.Provider value={{
            downloads,
            addToOffline,
            removeDownload,
            clearAllDownloads,
            storageUsage
        }}>
            {children}
        </OfflineContext.Provider>
    );
}

export function useOfflineManager() {
    return useContext(OfflineContext);
}
