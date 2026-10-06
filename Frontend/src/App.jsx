import { Outlet, Link, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Navbar from './components/Navbar';

export default function App() {
  const location = useLocation();
  const isAI = location.pathname.startsWith('/ai');

  return (
    <div className={`flex flex-col bg-gray-50 dark:bg-[#0C0F14] text-gray-900 dark:text-gray-100 transition-colors duration-300 ${isAI ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Navbar />
      <main className={`flex-1 w-full ${isAI ? 'overflow-hidden flex flex-col' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <Outlet />
      </main>
      <footer className="border-t dark:border-gray-800 bg-white dark:bg-[#151926] transition-colors duration-300 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} learnix. All rights reserved.
        </div>
      </footer>
    </div>
  );
}