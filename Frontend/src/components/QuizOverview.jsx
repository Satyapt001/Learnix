import React, { useState, useEffect } from 'react';
import api from '../lib/api';

export default function QuizOverview({ moduleId, onStartQuiz }) {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!moduleId) return;

        const fetchQuizData = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/quizzes/${moduleId}`);
                setQuizData(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load quiz');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [moduleId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">No Quiz Available</h3>
                <p className="text-gray-600 dark:text-slate-400">{error}</p>
            </div>
        );
    }

    const { title, description, questions, timeLimit, difficulty, passingScore, attemptCount, maxAttempts, bestScore } = quizData;
    const attemptsRemaining = maxAttempts - attemptCount;
    const canAttempt = attemptsRemaining > 0;

    // Difficulty color mapping
    const difficultyColors = {
        Easy: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        Medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        Hard: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
    };

    return (
        <div className="space-y-6">
            {/* Main Quiz Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">{title}</h2>
                        {description && (
                            <p className="text-gray-600 dark:text-slate-400">{description}</p>
                        )}
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 ${difficultyColors[difficulty] || difficultyColors.Medium}`}>
                        {difficulty}
                    </div>
                </div>

                {/* Quiz Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[16px] p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-medium text-gray-600 dark:text-slate-400">Questions</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{questions?.length || 0}</div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[16px] p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-medium text-gray-600 dark:text-slate-400">Time Limit</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{timeLimit}m</div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[16px] p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-medium text-gray-600 dark:text-slate-400">Passing</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{passingScore}%</div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[16px] p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="text-xs font-medium text-gray-600 dark:text-slate-400">Attempts</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{attemptCount}/{maxAttempts}</div>
                    </div>
                </div>

                {/* Best Score Badge */}
                {bestScore && (
                    <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-indigo-950/40 dark:to-indigo-900/20 rounded-[18px] border-2 border-indigo-200 dark:border-indigo-800">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-600 dark:text-slate-400">Your Best Score</div>
                                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{bestScore.percentage}%</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Start Quiz Button */}
                {canAttempt ? (
                    <button
                        onClick={onStartQuiz}
                        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 text-white rounded-[18px] font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_0_2px_rgba(99,102,241,0.1),0_0_20px_rgba(99,102,241,0.2),0_4px_12px_rgba(99,102,241,0.15)] dark:shadow-[0_0_0_2px_rgba(129,140,248,0.15),0_0_20px_rgba(129,140,248,0.25),0_4px_12px_rgba(129,140,248,0.2)] hover:shadow-[0_0_0_2px_rgba(99,102,241,0.15),0_0_24px_rgba(99,102,241,0.25),0_6px_16px_rgba(99,102,241,0.2)]"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Start Quiz
                        </span>
                    </button>
                ) : (
                    <div className="text-center p-6 bg-gray-50 dark:bg-slate-800/50 rounded-[18px]">
                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-gray-600 dark:text-slate-400 font-medium">Maximum attempts reached</p>
                        <p className="text-sm text-gray-500 dark:text-slate-500 mt-1">You've used all {maxAttempts} attempts for this quiz</p>
                    </div>
                )}

                {canAttempt && attemptsRemaining < maxAttempts && (
                    <p className="text-center text-sm text-gray-500 dark:text-slate-500 mt-3">
                        {attemptsRemaining} {attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining
                    </p>
                )}
            </div>
        </div>
    );
}
