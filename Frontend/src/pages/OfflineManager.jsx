import React from 'react';
import { useOfflineManager } from '../context/OfflineContext';
import { Download, Trash2, Play, Pause } from 'lucide-react';

export default function OfflineManager() {
  const { downloads, removeDownload, clearAllDownloads } = useOfflineManager();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Downloads</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your offline content</p>
        </div>
        {downloads.length > 0 && (
          <button
            onClick={clearAllDownloads}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {downloads.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No downloads yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Download courses to watch them offline</p>
        </div>
      ) : (
        <div className="space-y-4">
          {downloads.map((item) => (
            <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
                {item.type === 'video' ? <Play className="w-5 h-5" /> : '📄'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span className="capitalize">{item.type}</span>
                  <span>•</span>
                  <span>{item.size || 'Unknown size'}</span>
                  {item.status === 'downloading' && (
                    <span className="text-primary font-medium">{item.progress}%</span>
                  )}
                </div>
                {item.status === 'downloading' && (
                  <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => removeDownload(item._id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}