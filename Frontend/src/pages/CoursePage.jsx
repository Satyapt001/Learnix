import { useState, useMemo, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Quiz from '../components/Quiz';
import ModuleList from '../components/ModuleList';
import AIWidget from '../components/AIWidget';
import api from '../lib/api';

// Mock Data for Modules
const DEMO_MODULES = [
  {
    id: 'mod-1',
    title: '1. What is an Algorithm?',
    description: 'An algorithm is a set of instructions for solving a problem or accomplishing a task. In this module, we explore the fundamental concepts of algorithms, their importance in computer science, and how they shape the world around us.',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '05:30'
  },
  {
    id: 'mod-2',
    title: '2. Big O Notation Basics',
    description: 'Understanding time and space complexity is crucial for efficient coding. Learn how Big O notation helps us measure algorithm performance.',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '08:15'
  },
  {
    id: 'mod-3',
    title: '3. Sorting Algorithms',
    description: 'Dive into popular sorting algorithms like Bubble Sort, Merge Sort, and Quick Sort. See how they compare in efficiency.',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '12:00'
  },
  {
    id: 'mod-4',
    title: '4. Search Algorithms',
    description: 'Learn about Linear Search and Binary Search. Understand when to use which and why Binary Search is so fast.',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '10:45'
  }
];

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState('video');
  const [currentModuleId, setCurrentModuleId] = useState(DEMO_MODULES[0].id);
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('course_progress_demo');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  const currentModule = useMemo(() =>
    DEMO_MODULES.find(m => m.id === currentModuleId) || DEMO_MODULES[0],
    [currentModuleId]);

  const handleModuleComplete = () => {
    if (!completedModules.includes(currentModuleId)) {
      const newCompleted = [...completedModules, currentModuleId];
      setCompletedModules(newCompleted);
      localStorage.setItem('course_progress_demo', JSON.stringify(newCompleted));
    }
  };

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-brand font-medium mb-1">
            <span>Computer Science</span>
            <span>•</span>
            <span>Beginner</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Algorithms & Data Structures</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Master the fundamentals of CS with our interactive demo course.</p>
        </div>

        <div className="flex items-center gap-8 bg-white dark:bg-[#151926] px-6 py-3 rounded-2xl shadow-sm border dark:border-gray-700">
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Progress</div>
            <div className="text-xl font-bold text-brand">
              {Math.round((completedModules.length / DEMO_MODULES.length) * 100)}%
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Left</div>
            <div className="text-xl font-bold text-gray-700 dark:text-gray-200">
              {DEMO_MODULES.length - completedModules.length}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#151926] rounded-3xl p-1 shadow-sm border dark:border-gray-700 overflow-hidden">
            <VideoPlayer
              src={currentModule.videoUrl}
              poster="/public/poster-placeholder.jpg"
              onComplete={handleModuleComplete}
            />
          </div>

          <div className="bg-white dark:bg-[#151926] rounded-3xl p-1 shadow-sm border dark:border-gray-700 inline-flex">
            {['video', 'quiz'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === tab
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-[#151926] rounded-3xl p-8 shadow-sm border dark:border-gray-700">
            {activeTab === 'video' ? (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{currentModule.description}</p>

                <div className="mt-8 p-6 bg-brand/5 dark:bg-brand/10 rounded-2xl border border-brand/10 dark:border-brand/20 flex gap-4">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold text-brand-dark dark:text-brand-light mb-1">Learning Tip</h4>
                    <p className="text-sm text-brand-dark/80 dark:text-brand-light/80">
                      Stuck on a concept? Use the AI Tutor widget in the bottom right corner to ask specific questions about this video!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-4">
                <Quiz moduleId={currentModule.id} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-24">
            <ModuleList
              modules={DEMO_MODULES}
              currentModuleId={currentModuleId}
              completedModules={completedModules}
              onSelectModule={setCurrentModuleId}
            />
          </div>
        </div>
      </div>

      <AIWidget context={currentModule} />
    </div>
  );
}