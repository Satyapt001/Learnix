import React from 'react';

export default function ModuleList({
    modules,
    currentModuleId,
    onSelectModule,
    completedModules = [],
}) {
    const total = modules.length;
    const completedCount = completedModules.length;
    const progress = total ? Math.round((completedCount / total) * 100) : 0;

    return (
        <div className="bg-white dark:bg-[#151926] rounded-[20px] p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Header with progress */}
            <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                    Course Modules
                </h3>
                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 whitespace-nowrap min-w-[36px] text-right">
                        {progress}%
                    </span>
                </div>
            </div>

            {/* Module list */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {modules.map((module, index) => {
                    const isActive = module.id === currentModuleId;
                    const isCompleted = completedModules.includes(module.id);
                    const isLocked =
                        index > 0 &&
                        !completedModules.includes(modules[index - 1].id) &&
                        !isActive &&
                        !isCompleted;

                    return (
                        <button
                            key={module.id}
                            onClick={() => !isLocked && onSelectModule(module.id)}
                            disabled={isLocked}
                            className={`
                relative w-full text-left px-4 py-4 rounded-[18px] transition-all duration-300 group
                ${isActive
                                    ? 'bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-[#6366F1]/20 dark:to-[#6366F1]/10 border-2 border-indigo-500 dark:border-[#6366F1] shadow-[0_0_0_2px_rgba(99,102,241,0.1),0_0_20px_rgba(99,102,241,0.15),0_4px_12px_rgba(99,102,241,0.1)] dark:shadow-[0_0_0_2px_rgba(99,102,241,0.15),0_0_20px_rgba(99,102,241,0.2),0_4px_12px_rgba(99,102,241,0.15)]'
                                    : ''
                                }
                ${!isActive && !isLocked
                                    ? 'bg-gray-50/50 dark:bg-[#0C0F14]/30 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-[#0C0F14]/50 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md'
                                    : ''
                                }
                ${isLocked
                                    ? 'bg-gray-50 dark:bg-[#0C0F14]/20 border-2 border-transparent opacity-50 cursor-not-allowed'
                                    : ''
                                }
              `}
                        >
                            <div className="flex items-center gap-4">
                                {/* Icon */}
                                <div
                                    className={`
                    shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted
                                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                            : ''
                                        }
                    ${isActive && !isCompleted
                                            ? 'border-indigo-500 dark:border-[#6366F1] text-indigo-600 dark:text-[#6366F1] bg-white dark:bg-[#151926] shadow-md'
                                            : ''
                                        }
                    ${isLocked && !isCompleted
                                            ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-white dark:bg-[#0C0F14]'
                                            : ''
                                        }
                    ${!isActive && !isCompleted && !isLocked
                                            ? 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-white dark:bg-[#0C0F14] group-hover:border-indigo-400 group-hover:text-indigo-500 dark:group-hover:border-[#6366F1] dark:group-hover:text-[#6366F1]'
                                            : ''
                                        }
                  `}
                                >
                                    {isCompleted ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    ) : isLocked ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    ) : (
                                        <span className="text-sm font-bold">{index + 1}</span>
                                    )}
                                </div>

                                {/* Text content */}
                                <div className="flex-1 min-w-0">
                                    <div
                                        className={`font-semibold text-sm mb-1.5 line-clamp-1 ${isActive
                                            ? 'text-indigo-600 dark:text-indigo-400'
                                            : 'text-gray-900 dark:text-white'
                                            }`}
                                    >
                                        {module.title}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <span
                                            className={`flex items-center gap-1.5 ${isActive
                                                ? 'text-indigo-500 dark:text-indigo-400'
                                                : 'text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            <svg
                                                className="w-3.5 h-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {module.duration || '10:00'}
                                        </span>
                                        {isActive && (
                                            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse shadow-[0_0_4px_rgba(99,102,241,0.6)]" />
                                                Playing Now
                                            </span>
                                        )}
                                        {isCompleted && !isActive && (
                                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
