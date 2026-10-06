import React, { useState } from 'react';

export default function QuizResults({ result, quizData, onRetake, onClose }) {
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const {
        score,
        totalPoints,
        percentage,
        passed,
        passingScore,
        feedback,
        duration,
        attemptsRemaining
    } = result;

    const isPerfect = percentage === 100;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    // Calculate stats
    const correctCount = feedback?.filter(f => f.isCorrect).length || 0;
    const incorrectCount = feedback?.filter(f => !f.isCorrect && f.userResponse).length || 0;
    const skippedCount = feedback?.filter(f => !f.userResponse).length || 0;

    const toggleQuestion = (index) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    return (
        <div className="space-y-6">
            {/* Results Header */}
            <div className="bg-white dark:bg-slate-900 rounded-[20px] p-8 border border-gray-200 dark:border-slate-700 text-center">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${isPerfect
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                        : passed
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-500'
                            : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    } shadow-lg`}>
                    {isPerfect ? (
                        <svg className="w-12 h-12 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ) : passed ? (
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">
                    {isPerfect ? '🎉 Perfect Score!' : passed ? 'Well Done!' : 'Keep Practicing!'}
                </h2>

                {/* Score */}
                <div className={`text-6xl font-bold mb-2 ${isPerfect
                        ? 'text-yellow-500'
                        : passed
                            ? 'text-emerald-500'
                            : 'text-gray-500'
                    }`}>
                    {percentage}%
                </div>

                <p className="text-gray-600 dark:text-slate-400 text-lg">
                    You scored {score} out of {totalPoints} points
                </p>

                {/* Pass/Fail Status */}
                <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full ${passed
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                    {passed ? (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-bold">Passed</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="font-bold">Not Passed (Required: {passingScore}%)</span>
                        </>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900 rounded-[18px] p-4 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-slate-400">Correct</span>
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{correctCount}</div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[18px] p-4 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-slate-400">Incorrect</span>
                    </div>
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">{incorrectCount}</div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[18px] p-4 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-slate-400">Skipped</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-600 dark:text-slate-400">{skippedCount}</div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[18px] p-4 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-slate-400">Time</span>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {minutes}:{String(seconds).padStart(2, '0')}
                    </div>
                </div>
            </div>

            {/* Question-by-Question Breakdown */}
            {feedback && feedback.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-gray-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Question Breakdown</h3>
                    <div className="space-y-3">
                        {feedback.map((item, index) => (
                            <div
                                key={index}
                                className={`border-2 rounded-[16px] overflow-hidden transition-all ${item.isCorrect
                                        ? 'border-emerald-200 dark:border-emerald-800'
                                        : 'border-red-200 dark:border-red-800'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.isCorrect
                                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                            }`}>
                                            {item.isCorrect ? (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-900 dark:text-slate-100 text-left">
                                            Question {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-bold ${item.isCorrect
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-red-600 dark:text-red-400'
                                            }`}>
                                            {item.pointsEarned}/{item.totalPoints} pts
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 transition-transform ${expandedQuestion === index ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {expandedQuestion === index && (
                                    <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t-2 border-gray-200 dark:border-slate-700 space-y-3">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-slate-100 mb-2">
                                                {item.questionText}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">Your Answer:</p>
                                            <p className={`font-medium ${item.isCorrect
                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                    : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                {Array.isArray(item.userResponse)
                                                    ? item.userResponse.join(', ')
                                                    : item.userResponse || 'Not answered'}
                                            </p>
                                        </div>

                                        {!item.isCorrect && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">Correct Answer:</p>
                                                <p className="font-medium text-emerald-600 dark:text-emerald-400">
                                                    {Array.isArray(item.correctAnswer)
                                                        ? item.correctAnswer.join(', ')
                                                        : item.correctAnswer}
                                                </p>
                                            </div>
                                        )}

                                        {item.explanation && (
                                            <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                                                <p className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">Explanation:</p>
                                                <p className="text-sm text-gray-700 dark:text-slate-300">{item.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={onClose}
                    className="flex-1 py-3 px-6 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-[18px] font-bold hover:border-indigo-500 hover:text-indigo-500 transition-all"
                >
                    Close
                </button>
                {attemptsRemaining > 0 && (
                    <button
                        onClick={onRetake}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-[18px] font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_0_2px_rgba(99,102,241,0.1),0_0_20px_rgba(99,102,241,0.2),0_4px_12px_rgba(99,102,241,0.15)]"
                    >
                        Retake Quiz ({attemptsRemaining} {attemptsRemaining === 1 ? 'attempt' : 'attempts'} left)
                    </button>
                )}
            </div>
        </div>
    );
}
