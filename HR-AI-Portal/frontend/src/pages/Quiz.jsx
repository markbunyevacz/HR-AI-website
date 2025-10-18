import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Quiz.css';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (!timeLeft || isSubmitted) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      handleSubmitQuiz();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitted]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`/api/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const quizData = response.data.data;
        setQuiz(quizData);
        
        // Initialize time limit (convert minutes to seconds)
        if (quizData.timeLimit) {
          setTimeLeft(quizData.timeLimit * 60);
        }

        // Initialize answers object
        const initialAnswers = {};
        quizData.questions.forEach((_, index) => {
          initialAnswers[index] = null;
        });
        setAnswers(initialAnswers);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load quiz');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, selectedAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedAnswer
    }));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    const passed = scorePercentage >= quiz.passingScore;

    return {
      correctAnswers,
      totalQuestions,
      scorePercentage: Math.round(scorePercentage),
      passed,
    };
  };

  const handleSubmitQuiz = async () => {
    const quizResult = calculateScore();
    setResult(quizResult);
    setIsSubmitted(true);

    try {
      await axios.post(
        `/api/quizzes/${quizId}/submit`,
        {
          answers,
          score: quizResult.scorePercentage,
          passed: quizResult.passed,
          timeTaken: quiz.timeLimit ? (quiz.timeLimit * 60 - timeLeft) : null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isLoading) return <div className="quiz-loading">Loading quiz...</div>;
  if (error) return <div className="quiz-error">{error}</div>;
  if (!quiz) return <div className="quiz-error">Quiz not found</div>;

  if (!quizStarted) {
    return (
      <div className="quiz-intro">
        <div className="intro-card">
          <h1>{quiz.title}</h1>
          <p className="intro-description">{quiz.description}</p>

          <div className="quiz-info">
            <div className="info-item">
              <span className="info-label">Total Questions:</span>
              <span className="info-value">{quiz.questions.length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Passing Score:</span>
              <span className="info-value">{quiz.passingScore}%</span>
            </div>
            {quiz.timeLimit && (
              <div className="info-item">
                <span className="info-label">Time Limit:</span>
                <span className="info-value">{quiz.timeLimit} minutes</span>
              </div>
            )}
            {quiz.allowRetake && (
              <div className="info-item">
                <span className="info-label">Retakes Allowed:</span>
                <span className="info-value">Yes (up to {quiz.maxAttempts})</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="btn-start-quiz"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="quiz-result">
        <div className="result-card">
          <div className={`result-status ${result.passed ? 'passed' : 'failed'}`}>
            {result.passed ? '✓ PASSED' : '✗ FAILED'}
          </div>

          <h2>Quiz Complete!</h2>

          <div className="result-score">
            <div className="score-display">{result.scorePercentage}%</div>
          </div>

          <div className="result-details">
            <p>
              <strong>Correct Answers:</strong> {result.correctAnswers} / {result.totalQuestions}
            </p>
            <p>
              <strong>Passing Score Required:</strong> {quiz.passingScore}%
            </p>
            <p className="result-message">
              {result.passed
                ? 'Congratulations! You passed the quiz.'
                : 'Please review the material and try again.'}
            </p>
          </div>

          <div className="result-actions">
            {!result.passed && quiz.allowRetake && (
              <button
                onClick={() => window.location.reload()}
                className="btn-retake"
              >
                Retake Quiz
              </button>
            )}
            <button
              onClick={() => navigate('/courses')}
              className="btn-back-courses"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const allAnswered = Object.values(answers).every(a => a !== null);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>{quiz.title}</h1>
        {quiz.timeLimit && (
          <div className={`quiz-timer ${timeLeft <= 60 ? 'warning' : ''}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <h2 className="question-text">{currentQuestion.text}</h2>

          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={() => handleAnswerSelect(currentQuestionIndex, option)}
                  className="option-input"
                />
                <span className="option-label">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="quiz-navigation">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn-nav"
          >
            ← Previous
          </button>

          <div className="question-counter">
            {currentQuestionIndex + 1} / {quiz.questions.length}
          </div>

          {!isLastQuestion ? (
            <button
              onClick={handleNextQuestion}
              className="btn-nav"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered}
              className="btn-submit"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      <div className="quiz-sidebar">
        <h3>Question Overview</h3>
        <div className="question-grid">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`question-btn ${
                index === currentQuestionIndex ? 'active' : ''
              } ${answers[index] !== null ? 'answered' : ''}`}
              title={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
