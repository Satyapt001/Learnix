import React, { useState, useEffect, useRef } from 'react';
import CircularTimer from './CircularTimer';
import api from '../lib/api';

export default function QuizTaking({ quizData, onComplete, onCancel }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showReview, setShowReview] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [startTime] = useState(new Date());
    const autoSaveInterval = useRef(null);

    const { questions, timeLimit, moduleId, _id: quizId } = quizData;
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;

    // Auto-save to localStorage
    useEffect(() => {
        const saveKey = `quiz_${quizId}_answers`;

        autoSaveInterval.current = setInterval(() => {
            if (Object.keys(answers).length > 0) {
                localStorage.setItem(saveKey, JSON.stringify({
                    answers,
                    currentQuestionIndex,
                    startTime
                }));
            }
        }, 5000); // Save every 5 seconds

        return () => {
            if (autoSaveInterval.current) {
                clearInterval(autoSaveInterval.current);
            }
        };
    }, [answers, currentQuestionIndex, quizId, startTime]);

    // Load saved answers on mount
    useEffect(() => {
        const saveKey = `quiz_${quizId}_answers`;
        const saved = localStorage.getItem(saveKey);

        if (saved) {
            try {
                const { answers: savedAnswers, currentQuestionIndex: savedIndex } = JSON.parse(saved);
                setAnswers(savedAnswers);
                setCurrentQuestionIndex(savedIndex);
            } catch (e) {
                console.error('Failed to load saved answers:', e);
            }
        }
    }, [quizId]);

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleMultiSelectAnswer = (questionId, value) => {
        setAnswers(prev => {
            const current = prev[questionId] || [];
            const newValue = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return {
                ...prev,
                [questionId]: newValue
            };
        });
    };

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowReview(true);
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);

        try {
            const payload = Object.entries(answers).map(([questionId, response]) => ({
                questionId,
                response
            }));

            const { data } = await api.post(`/quizzes/${moduleId}/submit`, {
                answers: payload,
                startedAt: startTime.toISOString()
            });

            // Clear saved answers
            localStorage.removeItem(`quiz_${quizId}_answers`);

            onComplete(data);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert(error.response?.data?.message || 'Failed to submit quiz');
        } finally {
            setSubmitting(false);
        }
    };

    const handleTimeExpire = () => {
        alert('Time is up! Submitting your quiz...');
        handleSubmit();
    };

    if (showReview) {
        return (
            <div className="space-y-6">
                {/* Review Header */}
                <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">Review Your Answers</h2>
                    <p className="text-gray-600 dark:text-slate-400">
                        You've answered {answeredCount} out of {totalQuestions} questions. Review your answers before submitting.
                    </p>
                </div>

                {/* Question Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                    {questions.map((q, index) => {
                        const isAnswered = answers.hasOwnProperty(q._id);
                        return (
                            <button
                                key={q._id}
                                onClick={() => {
                                    setShowReview(false);
                                    setCurrentQuestionIndex(index);
                                }}
                                className={`
                  aspect-square rounded-xl font-bold text-sm transition-all duration-200
                  ${isAnswered
                                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border-2 border-gray-300 dark:border-slate-600'
                                    }
                  hover:scale-110 active:scale-95
                `}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowReview(false)}
                        className="flex-1 py-3 px-6 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-[18px] font-bold hover:border-indigo-500 hover:text-indigo-500 transition-all"
                    >
                        Back to Questions
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-[18px] font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_0_2px_rgba(99,102,241,0.1),0_0_20px_rgba(99,102,241,0.2),0_4px_12px_rgba(99,102,241,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </span>
                        ) : (
                            'Submit Quiz'
                        )}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Timer and Progress */}
            <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between gap-6">
                    {/* Progress */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
                                Question {currentQuestionIndex + 1} of {totalQuestions}
                            </span>
                            <span className="text-sm font-bold text-indigo-500">
                                {answeredCount}/{totalQuestions} answered
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Timer */}
                    <CircularTimer
                        duration={timeLimit * 60}
                        onExpire={handleTimeExpire}
                        size={80}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[20px] p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
                <div className="mb-6">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                            {currentQuestionIndex + 1}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 flex-1 leading-relaxed">
                            {currentQuestion.text || currentQuestion.prompt}
                        </h3>
                    </div>

                    {currentQuestion.type === 'mcq' && (
                        <div className="space-y-3 ml-14">
                            {currentQuestion.options?.map((option, index) => {
                                const isSelected = answers[currentQuestion._id] === option.value;
                                return (
                                    <label
                                        key={index}
                                        className={`
                      flex items-center gap-4 p-4 rounded-[16px] cursor-pointer transition-all duration-200 border-2
                      ${isSelected
                                                ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/30'
                                                : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600'
                                            }
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name={currentQuestion._id}
                                            value={option.value}
                                            checked={isSelected}
                                            onChange={() => handleAnswer(currentQuestion._id, option.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-white' : 'border-gray-300 dark:border-slate-600'}`}>
                                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                        </div>
                                        <span className="font-medium flex-1">{option.text}</span>
                                    </label>
                                );
                            })}
                        </div>
                    )}

                    {currentQuestion.type === 'multiselect' && (
                        <div className="space-y-3 ml-14">
                            {currentQuestion.options?.map((option, index) => {
                                const currentAnswers = answers[currentQuestion._id] || [];
                                const isSelected = currentAnswers.includes(option.value);
                                return (
                                    <label
                                        key={index}
                                        className={`
                      flex items-center gap-4 p-4 rounded-[16px] cursor-pointer transition-all duration-200 border-2
                      ${isSelected
                                                ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/30'
                                                : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600'
                                            }
                    `}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleMultiSelectAnswer(currentQuestion._id, option.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-white bg-white' : 'border-gray-300 dark:border-slate-600'}`}>
                                            {isSelected && (
                                                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="font-medium flex-1">{option.text}</span>
                                    </label>
                                );
                            })}
                            <p className="text-sm text-gray-500 dark:text-slate-400 ml-9 mt-2">
                                Select all that apply
                            </p>
                        </div>
                    )}

                    {currentQuestion.type === 'short' && (
                        <div className="ml-14">
                            <textarea
                                className="w-full bg-gray-50 dark:bg-slate-800/50 border-2 border-gray-200 dark:border-slate-700 rounded-[16px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 dark:text-slate-100 placeholder-gray-500 resize-none"
                                rows={6}
                                placeholder="Type your answer here..."
                                value={answers[currentQuestion._id] || ''}
                                onChange={(e) => handleAnswer(currentQuestion._id, e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-3 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-[16px] font-bold hover:border-indigo-500 hover:text-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-slate-700 disabled:hover:text-gray-900 dark:disabled:hover:text-slate-100"
                >
                    ← Previous
                </button>

                <button
                    onClick={onCancel}
                    className="px-6 py-3 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 font-medium transition-colors"
                >
                    Cancel Quiz
                </button>

                {currentQuestionIndex < totalQuestions - 1 ? (
                    <button
                        onClick={nextQuestion}
                        className="px-6 py-3 bg-indigo-500 text-white rounded-[16px] font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/30"
                    >
                        Next →
                    </button>
                ) : (
                    <button
                        onClick={() => setShowReview(true)}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-[16px] font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_0_2px_rgba(99,102,241,0.1),0_0_20px_rgba(99,102,241,0.2),0_4px_12px_rgba(99,102,241,0.15)]"
                    >
                        Review Answers
                    </button>
                )}
            </div>
        </div>
    );
}
