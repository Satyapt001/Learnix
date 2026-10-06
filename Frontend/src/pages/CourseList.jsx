import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { BookOpen, Rocket, ArrowRight, Clock, Star, Sparkles } from 'lucide-react';

export default function CourseList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/courses').then(r => setItems(r.data.items || [])).catch(() => setItems([]));
  }, []);

  return (
    <div className="space-y-12 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Explore Courses</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
            Discover new skills and advance your career with our premium curriculum.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((c, i) => (
          <Link key={i} to={`/courses/${c._id || i}`} className="group relative bg-white dark:bg-[#151926] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-48 bg-gray-50 dark:bg-dark-bg/50 rounded-3xl mb-8 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
              <div className="w-20 h-20 bg-white dark:bg-dark-surface rounded-2xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors duration-300">
                <BookOpen className="w-10 h-10" />
              </div>
            </div>

            <div className="relative space-y-3">
              <h3 className="font-bold text-2xl text-gray-900 dark:text-white group-hover:text-brand transition-colors">{c.title || 'Demo Course'}</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">{c.description || 'Sample description'}</p>

              <div className="pt-4 flex items-center text-brand font-semibold">
                View Course <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}

        {/* Demo Course Card - Algorithms */}
        {items.length === 0 && (
          <Link to="/courses/demo-1" className="group relative bg-white dark:bg-[#151926] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-56 bg-gradient-to-br from-primary-soft/30 to-primary-light/10 dark:from-primary-soft/10 dark:to-primary-light/5 rounded-3xl mb-8 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="relative w-24 h-24 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-lg ring-1 ring-white/20 flex items-center justify-center text-brand group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Rocket className="w-12 h-12" />
              </div>

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md text-brand text-xs font-bold uppercase tracking-wider shadow-sm border border-white/20">
                  Featured
                </span>
              </div>
            </div>

            <div className="relative space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-yellow-500" /> 4.9 (120)</span>
                <span>•</span>
                <span>4 Modules</span>
              </div>

              <h3 className="font-bold text-2xl text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                Algorithms & Data Structures
              </h3>

              <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                Master the fundamentals of Computer Science. Learn sorting, searching, and Big O notation with interactive examples.
              </p>

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">Beginner</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>45m</span>
                  </div>
                </div>
                <div className="flex items-center text-[#6366F1] font-bold text-sm bg-[#6366F1]/10 dark:bg-[#6366F1]/20 px-4 py-2 rounded-full group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                  Start Learning
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Machine Learning Course Card */}
        {items.length === 0 && (
          <Link to="/courses/demo-2" className="group relative bg-white dark:bg-[#151926] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-56 bg-gradient-to-br from-purple-500/30 to-pink-500/10 dark:from-purple-500/10 dark:to-pink-500/5 rounded-3xl mb-8 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="relative w-24 h-24 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-lg ring-1 ring-white/20 flex items-center justify-center text-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Sparkles className="w-12 h-12" />
              </div>
            </div>

            <div className="relative space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-yellow-500" /> 4.8 (95)</span>
                <span>•</span>
                <span>Advanced</span>
              </div>

              <h3 className="font-bold text-2xl text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                Machine Learning Fundamentals
              </h3>

              <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                Dive into the world of AI and Machine Learning. Learn supervised and unsupervised learning, neural networks, and practical applications.
              </p>

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">Advanced</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>3h 15m</span>
                  </div>
                </div>
                <div className="flex items-center text-[#6366F1] font-bold text-sm bg-[#6366F1]/10 dark:bg-[#6366F1]/20 px-4 py-2 rounded-full group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                  Start Learning
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* NLP Course Card */}
        {items.length === 0 && (
          <Link to="/courses/demo-3" className="group relative bg-white dark:bg-[#151926] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-56 bg-gradient-to-br from-blue-500/30 to-cyan-500/10 dark:from-blue-500/10 dark:to-cyan-500/5 rounded-3xl mb-8 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="relative w-24 h-24 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-lg ring-1 ring-white/20 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <BookOpen className="w-12 h-12" />
              </div>
            </div>

            <div className="relative space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-yellow-500" /> 4.7 (88)</span>
                <span>•</span>
                <span>Intermediate</span>
              </div>

              <h3 className="font-bold text-2xl text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                Natural Language Processing
              </h3>

              <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                Master NLP techniques and build intelligent text processing systems. Learn tokenization, sentiment analysis, and transformers.
              </p>

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">Intermediate</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>2h 45m</span>
                  </div>
                </div>
                <div className="flex items-center text-[#6366F1] font-bold text-sm bg-[#6366F1]/10 dark:bg-[#6366F1]/20 px-4 py-2 rounded-full group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                  Start Learning
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Full Stack Development Course Card */}
        {items.length === 0 && (
          <Link to="/courses/demo-4" className="group relative bg-white dark:bg-[#151926] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-56 bg-gradient-to-br from-green-500/30 to-emerald-500/10 dark:from-green-500/10 dark:to-emerald-500/5 rounded-3xl mb-8 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="relative w-24 h-24 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-lg ring-1 ring-white/20 flex items-center justify-center text-green-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Rocket className="w-12 h-12" />
              </div>
            </div>

            <div className="relative space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-yellow-500" /> 4.9 (150)</span>
                <span>•</span>
                <span>All Levels</span>
              </div>

              <h3 className="font-bold text-2xl text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                Full Stack Web Development
              </h3>

              <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                Build complete web applications from scratch. Master frontend, backend, databases, and deployment strategies.
              </p>

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">All Levels</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>5h 30m</span>
                  </div>
                </div>
                <div className="flex items-center text-[#6366F1] font-bold text-sm bg-[#6366F1]/10 dark:bg-[#6366F1]/20 px-4 py-2 rounded-full group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                  Start Learning
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}