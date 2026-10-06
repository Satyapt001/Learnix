import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import api from '../lib/api';

const DEMO_QUIZ = {
    _id: 'demo-quiz-1',
    title: 'Algorithm Basics Quiz',
    description: 'Test your knowledge of basic algorithm concepts.',
    timeLimit: 15,
    questions: [
        {
            _id: 'q1',
            text: 'What is the time complexity of binary search?',
            type: 'single',
            difficulty: 'Easy',
            points: 10,
            options: [
                { text: 'O(n)', value: 'a' },
                { text: 'O(log n)', value: 'b' },
                { text: 'O(n^2)', value: 'c' },
                { text: 'O(1)', value: 'd' }
            ],
            correctAnswer: 'b',
            explanation: 'Binary search divides the search interval in half at each step, resulting in logarithmic time complexity.'
        },
        {
            _id: 'q2',
            text: 'Which of the following is NOT a sorting algorithm?',
            type: 'single',
            difficulty: 'Easy',
            points: 10,
            options: [
                { text: 'Bubble Sort', value: 'a' },
                { text: 'Merge Sort', value: 'b' },
                { text: 'Binary Search', value: 'c' },
                { text: 'Quick Sort', value: 'd' }
            ],
            correctAnswer: 'c',
            explanation: 'Binary Search is a search algorithm, not a sorting algorithm.'
        }
    ]
};

const ML_DEMO_QUIZ = {
    _id: 'demo-quiz-2',
    title: 'Machine Learning Fundamentals Quiz',
    description: 'Test your understanding of machine learning concepts and algorithms.',
    timeLimit: 20,
    questions: [
        {
            _id: 'q1',
            text: 'What type of learning uses labeled data for training?',
            type: 'single',
            difficulty: 'Easy',
            points: 10,
            options: [
                { text: 'Supervised Learning', value: 'a' },
                { text: 'Unsupervised Learning', value: 'b' },
                { text: 'Reinforcement Learning', value: 'c' },
                { text: 'Semi-supervised Learning', value: 'd' }
            ],
            correctAnswer: 'a',
            explanation: 'Supervised learning uses labeled training data where each example has an input-output pair.'
        },
        {
            _id: 'q2',
            text: 'Which algorithm is commonly used for classification tasks?',
            type: 'single',
            difficulty: 'Medium',
            points: 15,
            options: [
                { text: 'K-Means', value: 'a' },
                { text: 'Random Forest', value: 'b' },
                { text: 'PCA', value: 'c' },
                { text: 'DBSCAN', value: 'd' }
            ],
            correctAnswer: 'b',
            explanation: 'Random Forest is a popular ensemble method used for both classification and regression tasks.'
        },
        {
            _id: 'q3',
            text: 'What is the purpose of a validation set in machine learning?',
            type: 'single',
            difficulty: 'Medium',
            points: 15,
            options: [
                { text: 'To train the model', value: 'a' },
                { text: 'To tune hyperparameters and prevent overfitting', value: 'b' },
                { text: 'To test final model performance', value: 'c' },
                { text: 'To collect more data', value: 'd' }
            ],
            correctAnswer: 'b',
            explanation: 'The validation set is used to tune hyperparameters and evaluate the model during training to prevent overfitting.'
        }
    ]
};

const FULLSTACK_DEMO_QUIZ = {
    _id: 'demo-quiz-4',
    title: 'Full Stack Development Quiz',
    description: 'Test your knowledge of frontend, backend, and database technologies.',
    timeLimit: 20,
    questions: [
        {
            _id: 'q1',
            text: 'Which of the following is a frontend JavaScript framework?',
            type: 'single',
            difficulty: 'Easy',
            points: 10,
            options: [
                { text: 'React', value: 'a' },
                { text: 'Express', value: 'b' },
                { text: 'MongoDB', value: 'c' },
                { text: 'PostgreSQL', value: 'd' }
            ],
            correctAnswer: 'a',
            explanation: 'React is a popular frontend JavaScript library for building user interfaces.'
        },
        {
            _id: 'q2',
            text: 'What does REST stand for in RESTful APIs?',
            type: 'single',
            difficulty: 'Medium',
            points: 15,
            options: [
                { text: 'Representational State Transfer', value: 'a' },
                { text: 'Remote Execution State Transfer', value: 'b' },
                { text: 'Relational State Transaction', value: 'c' },
                { text: 'Resource Execution State Transfer', value: 'd' }
            ],
            correctAnswer: 'a',
            explanation: 'REST stands for Representational State Transfer, an architectural style for designing networked applications.'
        },
        {
            _id: 'q3',
            text: 'Which database is commonly used in the MERN stack?',
            type: 'single',
            difficulty: 'Easy',
            points: 10,
            options: [
                { text: 'MySQL', value: 'a' },
                { text: 'MongoDB', value: 'b' },
                { text: 'PostgreSQL', value: 'c' },
                { text: 'SQLite', value: 'd' }
            ],
            correctAnswer: 'b',
            explanation: 'MERN stack uses MongoDB (M), Express (E), React (R), and Node.js (N).'
        },
        {
            _id: 'q4',
            text: 'What is the purpose of middleware in Express.js?',
            type: 'single',
            difficulty: 'Medium',
            points: 15,
            options: [
                { text: 'To style components', value: 'a' },
                { text: 'To process requests before they reach route handlers', value: 'b' },
                { text: 'To store data in the database', value: 'c' },
                { text: 'To render HTML templates', value: 'd' }
            ],
            correctAnswer: 'b',
            explanation: 'Middleware functions in Express.js process requests before they reach the final route handler, allowing for tasks like authentication, logging, and data parsing.'
        }
    ]
};

const NLP_DEMO_QUIZ = {
    _id: 'demo-quiz-3',
    title: 'Natural Language Processing Quiz',
    description: 'Test your understanding of NLP concepts and techniques.',
    timeLimit: 20,
    questions: [
        {
            _id: 'q1',
            text: 'What is tokenization in NLP?',
            type: 'single',
            difficulty: 'Easy',
            points: 10,
            options: [
                { text: 'Breaking text into individual words or tokens', value: 'a' },
                { text: 'Translating text to another language', value: 'b' },
                { text: 'Removing stop words', value: 'c' },
                { text: 'Converting text to lowercase', value: 'd' }
            ],
            correctAnswer: 'a',
            explanation: 'Tokenization is the process of breaking down text into smaller units called tokens, typically words or subwords.'
        },
        {
            _id: 'q2',
            text: 'Which model architecture revolutionized NLP with attention mechanisms?',
            type: 'single',
            difficulty: 'Medium',
            points: 15,
            options: [
                { text: 'RNN', value: 'a' },
                { text: 'CNN', value: 'b' },
                { text: 'Transformer', value: 'c' },
                { text: 'Decision Tree', value: 'd' }
            ],
            correctAnswer: 'c',
            explanation: 'The Transformer architecture, introduced in "Attention is All You Need", revolutionized NLP with its self-attention mechanism.'
        },
        {
            _id: 'q3',
            text: 'What is sentiment analysis used for?',
            type: 'single',
            difficulty: 'Easy',
            points: 10,
            options: [
                { text: 'Determining the emotional tone of text', value: 'a' },
                { text: 'Translating languages', value: 'b' },
                { text: 'Generating new text', value: 'c' },
                { text: 'Spell checking', value: 'd' }
            ],
            correctAnswer: 'a',
            explanation: 'Sentiment analysis is the task of determining the emotional tone or opinion expressed in text (positive, negative, or neutral).'
        },
        {
            _id: 'q4',
            text: 'What does BERT stand for?',
            type: 'single',
            difficulty: 'Medium',
            points: 15,
            options: [
                { text: 'Basic Encoding Representation Transformer', value: 'a' },
                { text: 'Bidirectional Encoder Representations from Transformers', value: 'b' },
                { text: 'Binary Encoded Recurrent Transformer', value: 'c' },
                { text: 'Balanced Embedding Representation Technique', value: 'd' }
            ],
            correctAnswer: 'b',
            explanation: 'BERT stands for Bidirectional Encoder Representations from Transformers, a pre-trained language model developed by Google.'
        }
    ]
};

export default function QuizPage({ moduleId, courseId }) {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showReview, setShowReview] = useState(false);

    useEffect(() => {
        fetchQuiz();
    }, [moduleId]);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || submitted) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, submitted]);

    const fetchQuiz = async () => {
        try {
            setLoading(true);

            if (courseId === 'demo-1') {
                setQuiz(DEMO_QUIZ);
                setTimeLeft(DEMO_QUIZ.timeLimit * 60);
                setAnswers({});
                setSubmitted(false);
                setResult(null);
                setShowReview(false);
                setLoading(false);
                return;
            }

            if (courseId === 'demo-2') {
                setQuiz(ML_DEMO_QUIZ);
                setTimeLeft(ML_DEMO_QUIZ.timeLimit * 60);
                setAnswers({});
                setSubmitted(false);
                setResult(null);
                setShowReview(false);
                setLoading(false);
                return;
            }

            if (courseId === 'demo-3') {
                setQuiz(NLP_DEMO_QUIZ);
                setTimeLeft(NLP_DEMO_QUIZ.timeLimit * 60);
                setAnswers({});
                setSubmitted(false);
                setResult(null);
                setShowReview(false);
                setLoading(false);
                return;
            }

            if (courseId === 'demo-4') {
                setQuiz(FULLSTACK_DEMO_QUIZ);
                setTimeLeft(FULLSTACK_DEMO_QUIZ.timeLimit * 60);
                setAnswers({});
                setSubmitted(false);
                setResult(null);
                setShowReview(false);
                setLoading(false);
                return;
            }

            const res = await api.get(`/quizzes/module/${moduleId}`);
            setQuiz(res.data);
            setTimeLeft(res.data.timeLimit * 60); // Convert minutes to seconds
            setAnswers({});
            setSubmitted(false);
            setResult(null);
            setShowReview(false);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching quiz:', error);
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleSubmit = async () => {
        if (submitted) return;

        try {
            if (courseId === 'demo-1' || courseId === 'demo-2' || courseId === 'demo-3' || courseId === 'demo-4') {
                // Mock submission logic
                const currentQuiz = courseId === 'demo-1' ? DEMO_QUIZ :
                    courseId === 'demo-2' ? ML_DEMO_QUIZ :
                        courseId === 'demo-3' ? NLP_DEMO_QUIZ :
                            FULLSTACK_DEMO_QUIZ;
                let score = 0;
                let correctCount = 0;
                const totalPoints = currentQuiz.questions.reduce((sum, q) => sum + q.points, 0);
                const details = currentQuiz.questions.map(q => {
                    const isCorrect = answers[q._id] === q.correctAnswer;
                    if (isCorrect) {
                        score += q.points;
                        correctCount++;
                    }
                    return { questionId: q._id, isCorrect };
                });

                const mockResult = {
                    score,
                    totalPoints,
                    percentage: Math.round((score / totalPoints) * 100),
                    passed: (score / totalPoints) >= 0.7,
                    correctCount,
                    totalQuestions: currentQuiz.questions.length,
                    details
                };

                setResult(mockResult);
                setSubmitted(true);
                return;
            }

            const userId = localStorage.getItem('userId');
            const res = await api.post('/quizzes/submit', {
                quizId: quiz._id,
                userId,
                answers,
                moduleId,
                courseId
            });

            setResult(res.data);
            setSubmitted(true);

            // Update progress with quiz score
            if (userId) {
                await api.post('/progress/quiz-score', {
                    userId,
                    courseId,
                    quizId: quiz._id,
                    moduleId,
                    score: res.data.score,
                    totalPoints: res.data.totalPoints,
                    percentage: res.data.percentage,
                    passed: res.data.passed
                });
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center border dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300">No quiz available for this module yet.</p>
            </div>
        );
    }

    if (submitted && !showReview) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border dark:border-gray-700">
                <div className="text-center">
                    {result.passed ? (
                        <div className="mb-6">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Congratulations!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">You passed the quiz!</p>
                        </div>
                    ) : (
                        <div className="mb-6">
                            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-12 h-12 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Keep Practicing!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">You can try again.</p>
                        </div>
                    )}

                    {/* Score Display */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
                            <div className="text-3xl font-bold text-primary mb-1">
                                {result.percentage}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {result.score}/{result.totalPoints}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {result.correctCount}/{result.totalQuestions}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => setShowReview(true)}
                            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors"
                        >
                            Review Answers
                        </button>
                        <button
                            onClick={fetchQuiz}
                            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Retry Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border dark:border-gray-700 overflow-hidden">
            {/* Quiz Header */}
            <div className="p-6 border-b dark:border-gray-700 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {quiz.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {quiz.description}
                        </p>
                    </div>
                    {!submitted && timeLeft !== null && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700">
                            <Clock className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-500' : 'text-primary'}`} />
                            <span className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Questions */}
            <div className="p-6 space-y-6">
                {quiz.questions.map((question, idx) => {
                    const questionId = question._id;
                    const userAnswer = answers[questionId];
                    const isCorrect = showReview && result?.details?.find(d => d.questionId === questionId)?.isCorrect;

                    return (
                        <div
                            key={questionId}
                            className={`p-6 rounded-2xl border-2 transition-all ${showReview
                                ? isCorrect
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
                                }`}
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </span>
                                <div className="flex-1">
                                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        {question.text}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className={`px-2 py-1 rounded-full ${question.difficulty === 'Easy'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : question.difficulty === 'Medium'
                                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {question.difficulty}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            {question.points} {question.points === 1 ? 'point' : 'points'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-2 ml-11">
                                {question.options.map((option) => {
                                    const isSelected = question.type === 'multiselect'
                                        ? userAnswer?.includes(option.value)
                                        : userAnswer === option.value;

                                    return (
                                        <label
                                            key={option.value}
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected
                                                ? 'border-primary bg-primary/10'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                                                } ${submitted ? 'cursor-not-allowed opacity-75' : ''}`}
                                        >
                                            <input
                                                type={question.type === 'multiselect' ? 'checkbox' : 'radio'}
                                                name={questionId}
                                                value={option.value}
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    if (submitted) return;
                                                    if (question.type === 'multiselect') {
                                                        const current = userAnswer || [];
                                                        handleAnswerChange(
                                                            questionId,
                                                            e.target.checked
                                                                ? [...current, option.value]
                                                                : current.filter(v => v !== option.value)
                                                        );
                                                    } else {
                                                        handleAnswerChange(questionId, option.value);
                                                    }
                                                }}
                                                disabled={submitted}
                                                className="w-4 h-4 text-primary"
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
                                        </label>
                                    );
                                })}
                            </div>

                            {/* Explanation (shown in review mode) */}
                            {showReview && question.explanation && (
                                <div className="mt-4 ml-11 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                                    <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                                        Explanation:
                                    </p>
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        {question.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Submit Button */}
            {!submitted && (
                <div className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length === 0}
                        className="w-full py-4 bg-gradient-to-r from-primary to-primary-hover text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Quiz
                    </button>
                </div>
            )}

            {showReview && (
                <div className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <button
                        onClick={() => setShowReview(false)}
                        className="w-full py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-bold text-lg transition-colors"
                    >
                        Back to Results
                    </button>
                </div>
            )}
        </div>
    );
}
