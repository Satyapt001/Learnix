import React, { useState, useRef, useEffect } from 'react';
import api from '../lib/api';

export default function AIWidget({ context }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ role: 'assistant', content: `Greetings! I am Pathfinder. I can help you navigate through "${context?.title || 'this module'}". What would you like to explore?` }]);
        }
    }, [isOpen, context]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const send = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input };
        const newHistory = [...messages, userMsg];
        setMessages(newHistory);
        setInput('');
        setLoading(true);

        try {
            const conversationToSend = [
                { role: 'system', content: `You are Pathfinder, an AI learning guide assisting with the course module: "${context?.title}". Description: "${context?.description}". Keep answers relevant to this context and be helpful and encouraging.` },
                ...newHistory
            ];

            const { data } = await api.post('/ai/chat', { conversation: conversationToSend });
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

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div
                className={`pointer-events-auto bg-white dark:bg-[#151926] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 sm:w-96 mb-4 transition-all duration-300 origin-bottom-right overflow-hidden flex flex-col
          ${isOpen ? 'opacity-100 scale-100 h-[500px]' : 'opacity-0 scale-90 h-0 mb-0'}
        `}
            >
                {/* Header */}
                <div className="bg-white dark:bg-[#151926] p-4 border-b dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-[#151926] flex items-center justify-center text-brand shadow-sm border border-gray-100 dark:border-gray-700">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Pathfinder</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Online</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0C0F14]/50" ref={scrollRef}>
                    {messages.map((m, i) => (
                        <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {m.role !== 'user' && (
                                <div className="w-7 h-7 rounded-full bg-white dark:bg-[#151926] flex items-center justify-center text-brand border border-gray-100 dark:border-gray-700 flex-shrink-0 mt-1 shadow-sm">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                            )}
                            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user'
                                ? 'bg-brand text-white rounded-br-sm'
                                : 'bg-white dark:bg-[#151926] border dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-bl-sm'
                                }`}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-7 h-7 rounded-full bg-white dark:bg-[#151926] flex items-center justify-center text-brand border border-gray-100 dark:border-gray-700 flex-shrink-0 mt-1 shadow-sm">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <div className="bg-white dark:bg-[#151926] border dark:border-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce delay-100" />
                                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white dark:bg-[#151926] border-t dark:border-gray-700">
                    <div className="relative group">
                        <div className="absolute left-3 top-3 flex items-center gap-1">
                            <button className="p-1.5 text-gray-400 hover:text-brand dark:hover:text-brand-light transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="Attach file">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-brand dark:hover:text-brand-light transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="Mention course">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </button>
                        </div>

                        <input
                            className="w-full bg-gray-100 dark:bg-[#0C0F14] border border-gray-200 dark:border-gray-700 rounded-2xl pl-20 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-gray-900 dark:text-white placeholder-gray-500"
                            placeholder="Ask Pathfinder..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />

                        <button
                            onClick={send}
                            disabled={!input.trim() || loading}
                            className={`absolute right-2 top-2 p-2 rounded-xl transition-all duration-200 ${!input.trim() || loading
                                ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-600 cursor-not-allowed'
                                : 'bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-lg shadow-brand/20 hover:scale-105 active:scale-95'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-2">
                        Pathfinder can make mistakes. Review responses.
                    </p>
                </div>
            </div>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto group flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-xl shadow-brand/20 transition-all duration-300 hover:scale-105 active:scale-95
          ${isOpen
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-white dark:bg-[#151926] text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700'
                    }
        `}
            >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    )}
                </div>
                <span className="font-bold text-sm tracking-wide">
                    {isOpen ? 'Close' : 'Ask Pathfinder'}
                </span>
            </button>
        </div>
    );
}
