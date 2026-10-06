import { Link } from 'react-router-dom';
import { Brain, MessageCircle, BarChart, Wifi, Zap, Leaf } from 'lucide-react';

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50 dark:opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-brand/10 rounded-full blur-[100px] -z-10 opacity-30 dark:opacity-10 pointer-events-none" />

      <section className="space-y-24 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-sm shadow-sm mb-4 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-sm font-medium text-text-secondary">AI Tutor v2.0 is live</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-bold text-text-primary tracking-tight leading-[1.1]">
            Master any skill with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-primary-light">
              intelligent learning
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto font-light">
            The adaptive platform that evolves with you. Experience the future of education with our offline-first AI tutor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              to="/courses"
              className="group relative px-8 py-4 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-full font-semibold shadow-xl shadow-brand/20 hover:shadow-brand/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Browse Courses</span>
            </Link>
            <Link
              to="/ai"
              className="px-8 py-4 bg-white dark:bg-white/5 text-text-primary border border-gray-200 dark:border-white/10 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Try AI Tutor
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <Feature
            icon={<Brain className="w-6 h-6" />}
            title="Adaptive Learning"
            desc="Personalized pace and task recommendations tailored to your unique learning style."
            delay={0}
          />
          <Feature
            icon={<MessageCircle className="w-6 h-6" />}
            title="Real-time AI Tutor"
            desc="Get instant hints, explanations, and code reviews from your personal AI assistant."
            delay={100}
          />
          <Feature
            icon={<BarChart className="w-6 h-6" />}
            title="Smart Analytics"
            desc="Track your accuracy, pace, and identify skill gaps with detailed insights."
            delay={200}
          />
          <Feature
            icon={<Wifi className="w-6 h-6" />}
            title="Offline First"
            desc="Keep learning anywhere. Download videos and sync progress when you're back online."
            delay={300}
          />
          <Feature
            icon={<Zap className="w-6 h-6" />}
            title="Lightweight"
            desc="Runs smoothly on any device with optimized performance and compact models."
            delay={400}
          />
          <Feature
            icon={<Leaf className="w-6 h-6" />}
            title="Sustainable"
            desc="Efficient compute usage minimizes our cloud footprint for a greener future."
            delay={500}
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc, delay }) {
  return (
    <div
      className="group p-8 rounded-[2rem] bg-white dark:bg-[#151926] border border-gray-100 dark:border-gray-800/50 shadow-sm hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-2 transition-all duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 bg-gradient-to-br from-brand/10 to-primary/5 dark:from-brand/20 dark:to-primary/10 text-brand rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-text-primary mb-3">{title}</h3>
      <p className="text-base text-text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}