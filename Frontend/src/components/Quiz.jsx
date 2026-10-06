import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import QuizOverview from './QuizOverview';
import QuizTaking from './QuizTaking';
import QuizResults from './QuizResults';

export default function Quiz({ moduleId }) {
  const [quizState, setQuizState] = useState('overview'); // 'overview', 'taking', 'results'
  const [quizData, setQuizData] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/quizzes/${moduleId}`);
      setQuizData(data);
      return data;
    } catch (error) {
      console.error('Error fetching quiz:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    try {
      const data = await fetchQuizData();
      if (data) {
        setQuizState('taking');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to start quiz');
    }
  };

  const handleQuizComplete = (resultData) => {
    setResults(resultData);
    setQuizState('results');
  };

  const handleRetake = () => {
    setResults(null);
    setQuizData(null);
    setQuizState('overview');
  };

  const handleClose = () => {
    setQuizState('overview');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this quiz? Your progress will be lost.')) {
      setQuizState('overview');
    }
  };

  // Render based on state
  if (quizState === 'overview') {
    return (
      <QuizOverview
        moduleId={moduleId}
        onStartQuiz={handleStartQuiz}
      />
    );
  }

  if (quizState === 'taking') {
    if (loading || !quizData) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      );
    }

    return (
      <QuizTaking
        quizData={quizData}
        onComplete={handleQuizComplete}
        onCancel={handleCancel}
      />
    );
  }

  if (quizState === 'results') {
    return (
      <QuizResults
        result={results}
        quizData={quizData}
        onRetake={handleRetake}
        onClose={handleClose}
      />
    );
  }

  return null;
}