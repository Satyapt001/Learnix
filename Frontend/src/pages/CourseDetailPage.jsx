import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Lock, CheckCircle, Clock, Award, Download } from 'lucide-react';
import api from '../lib/api';
import VideoPlayer from '../components/VideoPlayer';
import ModuleSidebar from '../components/ModuleSidebar';
import QuizPage from './QuizPage';
import AIWidget from '../components/AIWidget';
import { useOfflineManager } from '../context/OfflineContext';

const DEMO_MODULES = [
    {
        _id: 'mod-1',
        title: '1. What is an Algorithm?',
        description: 'An algorithm is a set of instructions for solving a problem or accomplishing a task.',
        videoUrl: 'https://www.youtube.com/embed/8hly31xKli0',
        duration: 330,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'mod-2',
        title: '2. Big O Notation Basics',
        description: 'Understanding time and space complexity is crucial for efficient coding.',
        videoUrl: 'https://www.youtube.com/embed/v4cd1O4zkGw',
        duration: 495,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'mod-3',
        title: '3. Sorting Algorithms',
        description: 'Dive into popular sorting algorithms like Bubble Sort, Merge Sort, and Quick Sort.',
        videoUrl: 'https://www.youtube.com/embed/Kg4bqzAqRBM',
        duration: 720,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'mod-4',
        title: '4. Search Algorithms',
        description: 'Learn about Linear Search and Binary Search.',
        videoUrl: 'https://www.youtube.com/embed/MFhxShGxHWc',
        duration: 645,
        thumbnailUrl: '/poster-placeholder.jpg'
    }
];

const ML_DEMO_MODULES = [
    {
        _id: 'ml-mod-1',
        title: '1. Introduction to Machine Learning',
        description: 'Understand the basics of ML, types of learning, and real-world applications.',
        videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg',
        duration: 600,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'ml-mod-2',
        title: '2. Supervised Learning',
        description: 'Learn about classification and regression algorithms.',
        videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg?start=600',
        duration: 720,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'ml-mod-3',
        title: '3. Unsupervised Learning',
        description: 'Explore clustering, dimensionality reduction, and pattern recognition.',
        videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg?start=1320',
        duration: 680,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'ml-mod-4',
        title: '4. Neural Networks & Deep Learning',
        description: 'Introduction to neural networks, backpropagation, and deep learning frameworks.',
        videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg?start=2000',
        duration: 800,
        thumbnailUrl: '/poster-placeholder.jpg'
    }
];

const FULLSTACK_DEMO_MODULES = [
    {
        _id: 'fs-mod-1',
        title: '1. Introduction to Full Stack Development',
        description: 'Overview of frontend, backend, and database technologies in modern web development.',
        videoUrl: 'https://www.youtube.com/embed/LzMnsfqjzkA',
        duration: 900,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'fs-mod-2',
        title: '2. Frontend Development with React',
        description: 'Build interactive user interfaces with React, components, and state management.',
        videoUrl: 'https://www.youtube.com/embed/LzMnsfqjzkA?start=900',
        duration: 1200,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'fs-mod-3',
        title: '3. Backend Development with Node.js',
        description: 'Create RESTful APIs, handle authentication, and manage server-side logic.',
        videoUrl: 'https://www.youtube.com/embed/LzMnsfqjzkA?start=2100',
        duration: 1100,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'fs-mod-4',
        title: '4. Database & Deployment',
        description: 'Work with MongoDB, integrate databases, and deploy full stack applications.',
        videoUrl: 'https://www.youtube.com/embed/LzMnsfqjzkA?start=3200',
        duration: 1000,
        thumbnailUrl: '/poster-placeholder.jpg'
    }
];

const NLP_DEMO_MODULES = [
    {
        _id: 'nlp-mod-1',
        title: '1. Introduction to NLP',
        description: 'Understanding natural language processing, its applications, and core concepts.',
        videoUrl: 'https://www.youtube.com/embed/dIUTsFT2MeQ',
        duration: 720,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'nlp-mod-2',
        title: '2. Text Preprocessing & Tokenization',
        description: 'Learn text cleaning, tokenization, stemming, and lemmatization techniques.',
        videoUrl: 'https://www.youtube.com/embed/dIUTsFT2MeQ?start=720',
        duration: 650,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'nlp-mod-3',
        title: '3. Word Embeddings & Transformers',
        description: 'Explore Word2Vec, GloVe, and modern transformer architectures like BERT.',
        videoUrl: 'https://www.youtube.com/embed/dIUTsFT2MeQ?start=1370',
        duration: 800,
        thumbnailUrl: '/poster-placeholder.jpg'
    },
    {
        _id: 'nlp-mod-4',
        title: '4. NLP Applications',
        description: 'Sentiment analysis, named entity recognition, and text generation applications.',
        videoUrl: 'https://www.youtube.com/embed/dIUTsFT2MeQ?start=2170',
        duration: 730,
        thumbnailUrl: '/poster-placeholder.jpg'
    }
];

export default function CourseDetailPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState({});
    const [progress, setProgress] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [activeTab, setActiveTab] = useState('video');
    const [loading, setLoading] = useState(true);
    const [currentModuleId, setCurrentModuleId] = useState(null);
    const { addToOffline } = useOfflineManager();

    useEffect(() => {
        fetchCourseData();
    }, [id]);

    const fetchCourseData = async () => {
        try {
            setLoading(true);

            // Mock data for demo-1
            if (id === 'demo-1') {
                const mockCourse = {
                    _id: 'demo-1',
                    title: 'Algorithms & Data Structures',
                    description: 'Master the fundamentals of CS with our interactive demo course.',
                    category: 'Computer Science',
                    level: 'Beginner',
                    totalDuration: 2190,
                    videoCount: 4,
                    modules: DEMO_MODULES
                };
                setCourse(mockCourse);

                const mockVideos = {};
                DEMO_MODULES.forEach(mod => {
                    mockVideos[mod._id] = [{
                        videoId: mod._id,
                        title: mod.title,
                        description: mod.description,
                        videoUrl: mod.videoUrl,
                        thumbnailUrl: mod.thumbnailUrl,
                        duration: mod.duration,
                        startTime: 0,
                        endTime: mod.duration
                    }];
                });
                setVideos(mockVideos);

                setCurrentModuleId(DEMO_MODULES[0]._id);
                setCurrentVideo(mockVideos[DEMO_MODULES[0]._id][0]);
                setLoading(false);
                return;
            }

            // Mock data for demo-2 (Machine Learning)
            if (id === 'demo-2') {
                const mockCourse = {
                    _id: 'demo-2',
                    title: 'Machine Learning Fundamentals',
                    description: 'Dive into the world of AI and Machine Learning with comprehensive tutorials.',
                    category: 'Artificial Intelligence',
                    level: 'Advanced',
                    totalDuration: 2800,
                    videoCount: 4,
                    modules: ML_DEMO_MODULES
                };
                setCourse(mockCourse);

                const mockVideos = {};
                ML_DEMO_MODULES.forEach(mod => {
                    mockVideos[mod._id] = [{
                        videoId: mod._id,
                        title: mod.title,
                        description: mod.description,
                        videoUrl: mod.videoUrl,
                        thumbnailUrl: mod.thumbnailUrl,
                        duration: mod.duration,
                        startTime: 0,
                        endTime: mod.duration
                    }];
                });
                setVideos(mockVideos);

                setCurrentModuleId(ML_DEMO_MODULES[0]._id);
                setCurrentVideo(mockVideos[ML_DEMO_MODULES[0]._id][0]);
                setLoading(false);
                return;
            }

            // Mock data for demo-3 (NLP)
            if (id === 'demo-3') {
                const mockCourse = {
                    _id: 'demo-3',
                    title: 'Natural Language Processing',
                    description: 'Master NLP techniques and build intelligent text processing systems.',
                    category: 'Artificial Intelligence',
                    level: 'Intermediate',
                    totalDuration: 2900,
                    videoCount: 4,
                    modules: NLP_DEMO_MODULES
                };
                setCourse(mockCourse);

                const mockVideos = {};
                NLP_DEMO_MODULES.forEach(mod => {
                    mockVideos[mod._id] = [{
                        videoId: mod._id,
                        title: mod.title,
                        description: mod.description,
                        videoUrl: mod.videoUrl,
                        thumbnailUrl: mod.thumbnailUrl,
                        duration: mod.duration,
                        startTime: 0,
                        endTime: mod.duration
                    }];
                });
                setVideos(mockVideos);

                setCurrentModuleId(NLP_DEMO_MODULES[0]._id);
                setCurrentVideo(mockVideos[NLP_DEMO_MODULES[0]._id][0]);
                setLoading(false);
                return;
            }

            // Mock data for demo-4 (Full Stack Development)
            if (id === 'demo-4') {
                const mockCourse = {
                    _id: 'demo-4',
                    title: 'Full Stack Web Development',
                    description: 'Build complete web applications from scratch with modern technologies.',
                    category: 'Web Development',
                    level: 'All Levels',
                    totalDuration: 4200,
                    videoCount: 4,
                    modules: FULLSTACK_DEMO_MODULES
                };
                setCourse(mockCourse);

                const mockVideos = {};
                FULLSTACK_DEMO_MODULES.forEach(mod => {
                    mockVideos[mod._id] = [{
                        videoId: mod._id,
                        title: mod.title,
                        description: mod.description,
                        videoUrl: mod.videoUrl,
                        thumbnailUrl: mod.thumbnailUrl,
                        duration: mod.duration,
                        startTime: 0,
                        endTime: mod.duration
                    }];
                });
                setVideos(mockVideos);

                setCurrentModuleId(FULLSTACK_DEMO_MODULES[0]._id);
                setCurrentVideo(mockVideos[FULLSTACK_DEMO_MODULES[0]._id][0]);
                setLoading(false);
                return;
            }

            // Fetch course details
            const courseRes = await api.get(`/courses/${id}`);
            const courseData = courseRes.data;
            setCourse(courseData);

            // Fetch videos
            const videosRes = await api.get(`/videos/course/${id}`);
            const videosData = videosRes.data.data || {};

            // Create a mapping of module index to module ID for video grouping
            const moduleMapping = {};
            courseData.modules?.forEach((module, index) => {
                const modId = `mod-${index + 1}`;
                moduleMapping[modId] = module._id;
            });

            // Regroup videos by module _id instead of string moduleId
            const regroupedVideos = {};
            Object.keys(videosData).forEach(stringModId => {
                const mongoModId = moduleMapping[stringModId];
                if (mongoModId) {
                    regroupedVideos[mongoModId] = videosData[stringModId];
                }
            });

            setVideos(regroupedVideos);

            // Fetch user progress (if authenticated)
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const progressRes = await api.get(`/progress/${userId}/${id}`);
                    setProgress(progressRes.data.data);
                }
            } catch (err) {
                console.log('No progress found');
            }

            // Set first video as current
            const firstModule = courseData.modules?.[0];
            if (firstModule && regroupedVideos[firstModule._id]?.[0]) {
                setCurrentModuleId(firstModule._id);
                setCurrentVideo(regroupedVideos[firstModule._id][0]);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching course:', error);
            setLoading(false);
        }
    };

    const handleVideoSelect = (video, moduleId) => {
        setCurrentVideo(video);
        setCurrentModuleId(moduleId);
        setActiveTab('video');
    };

    const handleVideoComplete = async () => {
        if (!currentVideo) return;

        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                await api.post('/progress/complete-video', {
                    userId,
                    courseId: id,
                    videoId: currentVideo.videoId,
                    watchTime: currentVideo.duration
                });

                // Refresh progress
                const progressRes = await api.get(`/progress/${userId}/${id}`);
                setProgress(progressRes.data.data);
            }
        } catch (error) {
            console.error('Error marking video complete:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course not found</h2>
            </div>
        );
    }

    const completionPercentage = progress?.completionPercentage || 0;
    const certificateEarned = progress?.certificateEarned || false;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0C0F14]">
            {/* Hero Section */}
            <div className="bg-white dark:bg-[#151926] border-b dark:border-gray-700 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 text-sm font-medium mb-2">
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                                    {course.category}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full capitalize">
                                    {course.level}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                                {course.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                                {course.description}
                            </p>
                            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {Math.floor((course.totalDuration || 0) / 3600)}h {Math.floor(((course.totalDuration || 0) % 3600) / 60)}m
                                </span>
                                <span>•</span>
                                <span>{course.videoCount || 0} videos</span>
                                <span>•</span>
                                <span>{course.modules?.length || 0} modules</span>
                            </div>
                        </div>

                        {/* Progress Card */}
                        <div className="flex-shrink-0">
                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-6 border border-primary/20 shadow-lg min-w-[240px]">
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-primary mb-2">
                                        {completionPercentage}%
                                    </div>
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
                                        Course Progress
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                                        <div
                                            className="bg-gradient-to-r from-primary to-primary-hover h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${completionPercentage}%` }}
                                        />
                                    </div>
                                    {certificateEarned && (
                                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                                            <Award className="w-4 h-4" />
                                            Certificate Earned!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video & Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        {currentVideo && (
                            <div className="bg-white dark:bg-[#151926] rounded-3xl shadow-xl overflow-hidden border dark:border-gray-700">
                                <VideoPlayer
                                    src={currentVideo.videoUrl}
                                    poster={currentVideo.thumbnailUrl}
                                    startTime={currentVideo.startTime}
                                    endTime={currentVideo.endTime}
                                    onComplete={handleVideoComplete}
                                />
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                {currentVideo.title}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {currentVideo.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => addToOffline({
                                                    resourceId: currentVideo.videoId,
                                                    type: 'video',
                                                    title: currentVideo.title,
                                                    size: '25 MB', // Mock size
                                                    thumbnailUrl: currentVideo.thumbnailUrl,
                                                    metadata: { duration: currentVideo.duration }
                                                })}
                                                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors flex items-center gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download
                                            </button>
                                            <button
                                                onClick={handleVideoComplete}
                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Mark Completed
                                            </button>
                                        </div>
                                    </div>

                                    {/* Resources */}
                                    {currentVideo.resources?.length > 0 && (
                                        <div className="mt-6 pt-6 border-t dark:border-gray-700">
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                                                Resources
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {currentVideo.resources.map((resource, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={resource.url}
                                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        {resource.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tabs */}
                        <div className="bg-white dark:bg-[#151926] rounded-3xl shadow-xl p-1 inline-flex border dark:border-gray-700">
                            {['video', 'quiz'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${activeTab === tab
                                        ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'quiz' && currentModuleId && (
                            <QuizPage moduleId={currentModuleId} courseId={id} />
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <ModuleSidebar
                                modules={course.modules}
                                videos={videos}
                                currentVideo={currentVideo}
                                progress={progress}
                                onVideoSelect={handleVideoSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Widget */}
            <AIWidget context={{ course, currentVideo }} />
        </div>
    );
}
