import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function QuizScoresDashboard() {
    const { user } = useAuth();
    const [attempts, setAttempts] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        moduleId: '',
        passed: '',
        limit: 20,
        skip: 0
    });
    const [selectedAttempt, setSelectedAttempt] = useState(null);

    useEffect(() => {
        fetchAttempts();
        fetchStats();
    }, [filters]);

    const fetchAttempts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.moduleId) params.append('moduleId', filters.moduleId);
            if (filters.passed !== '') params.append('passed', filters.passed);
            params.append('limit', filters.limit);
            params.append('skip', filters.skip);

            const { data } = await api.get(`/quizzes/scores/user/${user._id}?${params}`);
            setAttempts(data.attempts || []);
        } catch (error) {
            console.error('Error fetching attempts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/quizzes/scores/stats');
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value, skip: 0 }));
    };

    const clearFilters = () => {
        setFilters({ moduleId: '', passed: '', limit: 20, skip: 0 });
    };

    const viewAttemptDetails = async (attemptId) => {
        try {
            const { data } = await api.get(`/quizzes/attempt/${attemptId}`);
            setSelectedAttempt(data);
        } catch (error) {
            console.error('Error fetching attempt details:', error);
        }
    };

    if (selectedAttempt) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => setSelectedAttempt(null)}
                    className="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to All Attempts
                </button>

                <div className="bg-white dark:bg-slate-900 rounded-[20px] p-8 border border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">Attempt Details</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[16px] p-4">
                            <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">Score</div>
                            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {selectedAttempt.percentage}%
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[16px] p-4">
                            <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">Points</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                                {selectedAttempt.score}/{selectedAttempt.totalPoints}
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[16px] p-4">
                            <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">Duration</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                                {Math.floor(selectedAttempt.duration / 60)}:{String(selectedAttempt.duration % 60).padStart(2, '0')}
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[16px] p-4">
                            <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">Status</div>
                            <div className={`text-lg font-bold ${selectedAttempt.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                {selectedAttempt.passed ? 'Passed' : 'Failed'}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-900 dark:text-slate-100">Answers</h3>
                        {selectedAttempt.answers?.map((answer, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-[16px] border-2 ${answer.isCorrect
                                        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20'
                                        : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    {answer.isCorrect ? (
                                        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                    <span className="font-medium text-gray-900 dark:text-slate-100">
                                        Question {index + 1}
                                    </span>
                                    <span className="ml-auto text-sm font-bold">
                                        {answer.pointsEarned} pts
                                    </span>
                                </div>
                                <div className="text-sm text-gray-700 dark:text-slate-300">
                                    Response: {Array.isArray(answer.response) ? answer.response.join(', ') : answer.response || 'Not answered'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-8">My Quiz Scores</h1>

            {/* Statistics Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 dark:text-slate-400">Total Attempts</div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-slate-100">{stats.totalAttempts}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 dark:text-slate-400">Pass Rate</div>
                                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.passRate}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 dark:text-slate-400">Avg Score</div>
                                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{Math.round(stats.avgPercentage)}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 dark:text-slate-400">Best Score</div>
                                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{Math.round(stats.bestPercentage)}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                            Filter by Status
                        </label>
                        <select
                            value={filters.passed}
                            onChange={(e) => handleFilterChange('passed', e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[12px] text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        >
                            <option value="">All Attempts</option>
                            <option value="true">Passed Only</option>
                            <option value="false">Failed Only</option>
                        </select>
                    </div>

                    <button
                        onClick={clearFilters}
                        className="mt-7 px-4 py-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 font-medium transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Attempts Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[20px] border border-gray-200 dark:border-slate-700 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    </div>
                ) : attempts.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">No Quiz Attempts</h3>
                        <p className="text-gray-600 dark:text-slate-400">You haven't taken any quizzes yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                        Quiz
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                        Module
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                        Score
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {attempts.map((attempt) => (
                                    <tr key={attempt._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-slate-100">
                                                {attempt.quizId?.title || 'Quiz'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 dark:text-slate-400">
                                                {attempt.moduleId?.title || 'Module'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-gray-900 dark:text-slate-100">
                                                    {attempt.percentage}%
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-slate-500">
                                                    ({attempt.score}/{attempt.totalPoints})
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${attempt.passed
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                }`}>
                                                {attempt.passed ? (
                                                    <>
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Passed
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        Failed
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 dark:text-slate-400">
                                                {new Date(attempt.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-slate-500">
                                                {new Date(attempt.createdAt).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => viewAttemptDetails(attempt.attemptId)}
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm transition-colors"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
