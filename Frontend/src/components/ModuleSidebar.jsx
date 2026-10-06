import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, CheckCircle, Lock, Clock } from 'lucide-react';

export default function ModuleSidebar({ modules, videos, currentVideo, progress, onVideoSelect }) {
    const [expandedModules, setExpandedModules] = useState({});

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const isVideoCompleted = (videoId) => {
        return progress?.completedVideos?.some(v => v.videoId === videoId) || false;
    };

    const isModuleCompleted = (moduleId) => {
        return progress?.completedModules?.some(m => m.moduleId === moduleId) || false;
    };

    const getModuleProgress = (moduleId) => {
        const moduleVideos = videos[moduleId] || [];
        if (moduleVideos.length === 0) return 0;

        const completedCount = moduleVideos.filter(v => isVideoCompleted(v.videoId)).length;
        return Math.round((completedCount / moduleVideos.length) * 100);
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        return `${mins}m`;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b dark:border-gray-700 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Content</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {modules?.length || 0} modules • {Object.values(videos).flat().length} videos
                </p>
            </div>

            <div className="max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-hide">
                {modules?.map((module, idx) => {
                    const moduleId = module._id;
                    const moduleVideos = videos[moduleId] || [];
                    const isExpanded = expandedModules[moduleId] !== false; // Default to expanded
                    const moduleProgress = getModuleProgress(moduleId);
                    const completed = isModuleCompleted(moduleId);

                    return (
                        <div key={moduleId} className="border-b dark:border-gray-700 last:border-b-0">
                            {/* Module Header */}
                            <button
                                onClick={() => toggleModule(moduleId)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                            >
                                <div className="flex items-center gap-3 flex-1 text-left">
                                    <div className="flex-shrink-0">
                                        {isExpanded ? (
                                            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                                                {module.title}
                                            </h3>
                                            {completed && (
                                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span>{moduleVideos.length} videos</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatDuration(module.durationSec || 0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Circle */}
                                <div className="flex-shrink-0 ml-3">
                                    <div className="relative w-10 h-10">
                                        <svg className="w-10 h-10 transform -rotate-90">
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r="16"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="none"
                                                className="text-gray-200 dark:text-gray-700"
                                            />
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r="16"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="none"
                                                strokeDasharray={`${2 * Math.PI * 16}`}
                                                strokeDashoffset={`${2 * Math.PI * 16 * (1 - moduleProgress / 100)}`}
                                                className="text-primary transition-all duration-500"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                {moduleProgress}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* Video List */}
                            {isExpanded && (
                                <div className="bg-gray-50 dark:bg-gray-900/50">
                                    {moduleVideos.map((video, videoIdx) => {
                                        const isCompleted = isVideoCompleted(video.videoId);
                                        const isCurrent = currentVideo?.videoId === video.videoId;

                                        return (
                                            <button
                                                key={video.videoId}
                                                onClick={() => onVideoSelect(video, moduleId)}
                                                className={`w-full px-6 py-3 pl-14 flex items-center gap-3 hover:bg-white dark:hover:bg-gray-800 transition-all group ${isCurrent ? 'bg-primary/10 dark:bg-primary/20 border-l-4 border-primary' : ''
                                                    }`}
                                            >
                                                {/* Icon */}
                                                <div className="flex-shrink-0">
                                                    {isCompleted ? (
                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                    ) : isCurrent ? (
                                                        <Play className="w-5 h-5 text-primary fill-primary" />
                                                    ) : (
                                                        <Play className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                                    )}
                                                </div>

                                                {/* Video Info */}
                                                <div className="flex-1 text-left min-w-0">
                                                    <div className={`text-sm font-medium truncate ${isCurrent
                                                        ? 'text-primary font-bold'
                                                        : 'text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary'
                                                        }`}>
                                                        {video.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDuration(video.duration)}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
