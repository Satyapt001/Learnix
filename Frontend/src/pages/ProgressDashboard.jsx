import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Clock, TrendingUp, BookOpen, CheckCircle, Play } from 'lucide-react';
import api from '../lib/api';

export default function ProgressDashboard() {
    const [progressData, setProgressData] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProgressData();
    }, []);

    const fetchProgressData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setLoading(false);
                return;
            }

            // Fetch progress
            const progressRes = await api.get(`/progress/user/${userId}`);
            setProgressData(progressRes.data.data);

            // Fetch certificates
            const certRes = await api.get(`/certificates/user/${userId}`);
            setCertificates(certRes.data.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching progress:', error);
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const totalWatchTime = progressData.reduce((sum, p) => sum + (p.totalWatchTime || 0), 0);
    const allQuizScores = progressData.flatMap(p => p.quizScores || []);
    const avgQuizScore = allQuizScores.length > 0
        ? Math.round(allQuizScores.reduce((sum, q) => sum + q.percentage, 0) / allQuizScores.length)
        : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        My Learning Progress
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Track your journey and achievements
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-[#151926] rounded-2xl p-6 border dark:border-gray-700 shadow-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {progressData.length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Courses Enrolled</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#151926] rounded-2xl p-6 border dark:border-gray-700 shadow-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {avgQuizScore}%
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Quiz Score</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#151926] rounded-2xl p-6 border dark:border-gray-700 shadow-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {formatTime(totalWatchTime)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Watch Time</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#151926] rounded-2xl p-6 border dark:border-gray-700 shadow-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                                <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {certificates.length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Certificates Earned</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificates Section */}
                {certificates.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            🏆 Your Certificates
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificates.map((cert) => (
                                <div
                                    key={cert._id}
                                    className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border-2 border-yellow-300 dark:border-yellow-700 shadow-lg"
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                                {cert.courseName}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                            {cert.completionPercentage}%
                                        </span>
                                        <a
                                            href={cert.verificationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline"
                                        >
                                            Verify →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Course Progress */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Course Progress
                    </h2>
                    <div className="space-y-4">
                        {progressData.map((progress) => (
                            <div
                                key={progress._id}
                                className="bg-white dark:bg-[#151926] rounded-2xl p-6 border dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start gap-6">
                                    {/* Course Thumbnail */}
                                    <img
                                        src={progress.courseId?.thumbnail || 'https://via.placeholder.com/150'}
                                        alt={progress.courseId?.title}
                                        className="w-32 h-32 rounded-xl object-cover flex-shrink-0"
                                    />

                                    {/* Course Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {progress.courseId?.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                            {progress.courseId?.description}
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Progress
                                                </span>
                                                <span className="text-sm font-bold text-primary">
                                                    {progress.completionPercentage}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-primary to-primary-hover h-3 rounded-full transition-all duration-500"
                                                    style={{ width: `${progress.completionPercentage}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4" />
                                                {progress.completedModules?.length || 0} modules completed
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {formatTime(progress.totalWatchTime || 0)} watched
                                            </span>
                                            {progress.quizScores?.length > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <TrendingUp className="w-4 h-4" />
                                                    Avg Quiz Score: {Math.round(progress.quizScores.reduce((acc, q) => acc + q.percentage, 0) / progress.quizScores.length)}%
                                                </span>
                                            )}
                                            {progress.certificateEarned && (
                                                <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                                                    <Award className="w-4 h-4" />
                                                    Certificate Earned
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Continue Button */}
                                    <Link
                                        to={`/courses/${progress.courseId?._id}`}
                                        className="flex-shrink-0 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                                    >
                                        <Play className="w-4 h-4" />
                                        Continue
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {progressData.length === 0 && (
                            <div className="bg-white dark:bg-[#151926] rounded-2xl p-12 text-center border dark:border-gray-700">
                                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    No courses yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Start learning by enrolling in a course
                                </p>
                                <Link
                                    to="/courses"
                                    className="inline-block px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
