import React, { useState, useEffect, useRef } from 'react';

export default function CircularTimer({
    duration, // in seconds
    onExpire,
    isPaused = false,
    size = 120
}) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
        if (isPaused) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    if (onExpire) onExpire();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, onExpire]);

    const percentage = (timeLeft / duration) * 100;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Color based on time remaining
    const getColor = () => {
        if (percentage > 50) return 'text-emerald-500 dark:text-emerald-400';
        if (percentage > 20) return 'text-amber-500 dark:text-amber-400';
        return 'text-red-500 dark:text-red-400';
    };

    const getStrokeColor = () => {
        if (percentage > 50) return '#10b981'; // emerald-500
        if (percentage > 20) return '#f59e0b'; // amber-500
        return '#ef4444'; // red-500
    };

    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background circle */}
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-slate-700"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getStrokeColor()}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                    style={{
                        filter: `drop-shadow(0 0 8px ${getStrokeColor()}40)`
                    }}
                />
            </svg>

            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-3xl font-bold ${getColor()} transition-colors duration-300`}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                    {percentage > 20 ? 'remaining' : 'hurry up!'}
                </div>
            </div>
        </div>
    );
}
