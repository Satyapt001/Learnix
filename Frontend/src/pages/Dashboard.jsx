import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, totalTime: 0 });

  useEffect(() => {
    // Mock stats for demo
    setStats({ completed: 2, inProgress: 1, totalTime: 45 });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h2>
        <Link to="/courses" className="text-brand hover:text-brand-dark font-medium text-sm">
          View All Courses →
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard
          label="Completed Modules"
          value={stats.completed}
          icon="✅"
          color="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
        />
        <StatCard
          label="In Progress"
          value={stats.inProgress}
          icon="clock" // Using text for now, can be replaced with SVG
          customIcon={<span className="text-xl">⏳</span>}
          color="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
        />
        <StatCard
          label="Learning Time"
          value={`${stats.totalTime}m`}
          icon="time"
          customIcon={<span className="text-xl">⏱️</span>}
          color="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
        />
      </div>

      <div className="bg-white dark:bg-[#151926] rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#0C0F14] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                ▶️
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">Algorithms & Data Structures</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Module {i}: Completed Quiz</div>
              </div>
              <div className="text-xs text-gray-400">2h ago</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, customIcon, color }) {
  return (
    <div className="bg-white dark:bg-[#151926] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
          {customIcon}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</div>
        </div>
      </div>
    </div>
  );
}