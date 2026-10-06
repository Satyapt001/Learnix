import { useState, useRef, useEffect } from 'react';
import api from '../lib/api';
import useAuth from '../hooks/useAuth';

export default function AIChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([{ role: 'assistant', content: `Greetings ${user?.name || 'traveler'}! I am Pathfinder. I can guide you through your learning journey. Where shall we go today?` }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef(null);

  // Mock Activity Log Data
  const activities = [
    { id: 1, title: 'React Fundamentals', date: 'Today, 10:23 AM', history: [{ role: 'user', content: 'Explain React hooks' }, { role: 'assistant', content: 'Hooks are functions that let you use state and other React features without writing a class.' }] },
    { id: 2, title: 'State Management', date: 'Yesterday, 2:15 PM', history: [{ role: 'user', content: 'What is Redux?' }, { role: 'assistant', content: 'Redux is a predictable state container for JavaScript apps.' }] },
    { id: 3, title: 'API Integration', date: 'Nov 21, 4:45 PM', history: [{ role: 'user', content: 'How to fetch data?' }, { role: 'assistant', content: 'You can use the fetch API or libraries like Axios.' }] },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/ai/chat', { conversation: newHistory });
      setMessages([...newHistory, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
      let errorMsg = 'Sorry, I am having trouble connecting to Pathfinder.';
      if (err.response?.status === 503) {
        errorMsg = 'Ollama service is not running. Please start it in your terminal.';
      }
      setMessages([...newHistory, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const loadHistory = (history) => {
    setMessages(history);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const startNewChat = () => {
    setMessages([{ role: 'assistant', content: `Greetings ${user?.name || 'traveler'}! I am Pathfinder. I can guide you through your learning journey. Where shall we go today?` }]);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-full bg-gray-50 dark:bg-[#0C0F14] overflow-hidden relative">
      {/* Sidebar - Activity Log */}
      <div
        className={`${isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full opacity-0'} 
        bg-white dark:bg-[#151926] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out absolute md:relative z-20 h-full shadow-2xl md:shadow-none`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            Journeys
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={startNewChat}
            className="w-full py-2.5 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Journey
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => loadHistory(activity.history)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
            >
              <div className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-brand transition-colors text-sm truncate">
                {activity.title}
              </div>
              <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {activity.date}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-[#0C0F14]">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 bg-gray-50/90 dark:bg-[#0C0F14]/90 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-all"
              title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              {isSidebarOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-[#151926] flex items-center justify-center text-brand shadow-sm border border-gray-100 dark:border-gray-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white leading-none">
                  Pathfinder
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Your Learning Guide
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                {user?.name || 'Traveler'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Student
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 font-bold text-sm border border-gray-200 dark:border-gray-700 shadow-sm">
              {user?.name?.[0]?.toUpperCase() || 'T'}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start max-w-3xl'}`}>
              {m.role !== 'user' && (
                <div className="w-8 h-8 rounded-full bg-white dark:bg-[#151926] flex items-center justify-center text-brand border border-gray-100 dark:border-gray-700 flex-shrink-0 mt-1 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              )}
              <div
                className={`px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user'
                  ? 'bg-brand text-white rounded-br-sm'
                  : 'bg-white dark:bg-[#151926] border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                  }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-[#151926] flex items-center justify-center text-brand border border-gray-100 dark:border-gray-700 flex-shrink-0 mt-1 shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="bg-white dark:bg-[#151926] border border-gray-100 dark:border-gray-700 px-6 py-4 rounded-2xl rounded-bl-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 shadow-sm">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute left-3 top-3 flex items-center gap-1">
              <button className="p-2 text-gray-400 hover:text-brand dark:hover:text-brand-light transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="Attach file">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-brand dark:hover:text-brand-light transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="Mention course">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </button>
            </div>

            <input
              className="w-full bg-white dark:bg-[#151926] border border-gray-200 dark:border-gray-700 rounded-2xl pl-24 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-gray-900 dark:text-white placeholder-gray-500 shadow-sm"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Pathfinder..."
              disabled={loading}
            />

            <button
              className={`absolute right-2 top-2 p-2 rounded-xl transition-all duration-200 ${loading || !input.trim()
                ? 'bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                : 'bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/20 hover:scale-105 active:scale-95'
                }`}
              onClick={send}
              disabled={loading || !input.trim()}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
            Pathfinder can make mistakes. Review generated responses.
          </p>
        </div>
      </div>
    </div>
  );
}