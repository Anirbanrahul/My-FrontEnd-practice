import React, { useState, useEffect, useRef } from 'react';
import { ALL_FE_QUESTIONS } from '../FeQuestions/feQuestionsData';
import './Quiz.css';

// Helper to sanitize markdown syntax for options
const cleanText = (text) => {
  if (!text) return '';
  let cleaned = text
    .replace(/\*\*/g, '')
    .replace(/```[\s\S]*?```/g, '[Code snippet]')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();
  
  if (cleaned.length > 140) {
    return cleaned.slice(0, 140) + '...';
  }
  return cleaned;
};

// Helper to shuffle array
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const QuizDemo = () => {
  const [quizState, setQuizState] = useState('idle'); // 'idle' | 'playing' | 'finished'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const timerRef = useRef(null);

  // Start/Restart Quiz
  const startQuiz = () => {
    // Pick 20 random questions from ALL_FE_QUESTIONS
    const validQuestions = ALL_FE_QUESTIONS.filter(q => q.question && q.answer);
    const shuffled = shuffleArray(validQuestions).slice(0, 20);

    const preparedQuestions = shuffled.map((q) => {
      // Pick 3 random wrong answers from other questions
      const otherAnswers = validQuestions
        .filter(item => item.id !== q.id)
        .map(item => item.answer);
      const shuffledOthers = shuffleArray(otherAnswers).slice(0, 3);

      const correctAnswerClean = cleanText(q.answer);
      const options = shuffleArray([
        { text: correctAnswerClean, isCorrect: true, original: q.answer },
        ...shuffledOthers.map(ans => ({ text: cleanText(ans), isCorrect: false, original: ans }))
      ]);

      return {
        ...q,
        options,
        correctAnswerText: correctAnswerClean
      };
    });

    setQuestions(preparedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setQuizState('playing');
  };

  // Reset Quiz back to start screen
  const resetQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setQuizState('idle');
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers([]);
  };

  // Overall 30-Second Timer Effect for the entire quiz
  useEffect(() => {
    if (quizState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setQuizState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState]);

  const handleOptionSelect = (option) => {
    if (isAnswered || quizState !== 'playing') return;

    setIsAnswered(true);
    setSelectedOption(option);

    const isCorrect = option.isCorrect;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        question: questions[currentIndex]?.question,
        selected: option.text,
        correct: questions[currentIndex]?.correctAnswerText,
        isCorrect
      }
    ]);

    // Quick delay (400ms) for snappy feedback then advance
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setQuizState('finished');
      }
    }, 400);
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="quiz-container">
      {/* Idle / Start Screen */}
      {quizState === 'idle' && (
        <div className="quiz-start-card demo-card">
          <div className="quiz-badge">⚡ Interactive Practice</div>
          <h2 className="demo-title">Frontend Speed Quiz</h2>
          <p className="demo-description">
            Test your core React, JavaScript, HTML, CSS, and Web Performance knowledge under pressure!
          </p>

          <div className="quiz-rules">
            <div className="rule-item">
              <span className="rule-icon">🎯</span>
              <div>
                <strong>20 Random Questions</strong>
                <p>Selected dynamically from 450+ Frontend Interview Questions.</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">⏱️</span>
              <div>
                <strong>30-Second Total Timer</strong>
                <p>30-second total countdown for the entire quiz round.</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">🏆</span>
              <div>
                <strong>Instant Scoring</strong>
                <p>Track your score and view detailed summary upon completion.</p>
              </div>
            </div>
          </div>

          <div className="quiz-actions">
            <button className="btn quiz-start-btn" onClick={startQuiz}>
              🚀 Start 20-Question Quiz
            </button>
          </div>
        </div>
      )}

      {/* Active Playing Screen */}
      {quizState === 'playing' && currentQ && (
        <div className="quiz-active-card demo-card">
          {/* Top Bar: Progress, Timer, Reset */}
          <div className="quiz-header">
            <div className="quiz-progress">
              Question <strong>{currentIndex + 1}</strong> of {questions.length}
            </div>

            <div className={`quiz-timer ${timeLeft <= 10 ? 'warning' : ''}`}>
              ⏱️ {timeLeft}s
            </div>

            <button className="btn-secondary quiz-reset-btn" onClick={resetQuiz}>
              🔄 Reset Quiz
            </button>
          </div>

          {/* Progress Bar */}
          <div className="quiz-progress-bar-bg">
            <div
              className="quiz-progress-bar-fill"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Title */}
          <div className="quiz-question-box">
            <span className="question-tag">{currentQ.section || 'Frontend'}</span>
            <h3 className="quiz-question-text">{currentQ.question}</h3>
          </div>

          {/* Options Grid */}
          <div className="quiz-options-grid">
            {currentQ.options.map((opt, idx) => {
              let optionClass = 'quiz-option-btn';
              if (isAnswered) {
                if (opt.isCorrect) {
                  optionClass += ' correct';
                } else if (selectedOption === opt && !opt.isCorrect) {
                  optionClass += ' wrong';
                }
              }

              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={isAnswered}
                >
                  <span className="option-label">{String.fromCharCode(65 + idx)}.</span>
                  <span className="option-text">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Question Footer Status */}
          <div className="quiz-footer-status">
            <span>Score: <strong>{score}</strong></span>
          </div>
        </div>
      )}

      {/* Results Screen */}
      {quizState === 'finished' && (
        <div className="quiz-finished-card demo-card">
          <div className="quiz-finish-header">
            <h2>🎉 Quiz Completed!</h2>
            <p className="demo-description">Here is how you performed on this round:</p>
          </div>

          <div className="quiz-score-circle">
            <div className="score-num">{score} / {questions.length}</div>
            <div className="score-percent">{Math.round((score / questions.length) * 100)}% Accuracy</div>
          </div>

          <div className="quiz-actions" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <button className="btn quiz-start-btn" onClick={startQuiz}>
              🔄 Retake Quiz (New 20 Questions)
            </button>
            <button className="btn-secondary" onClick={resetQuiz} style={{ marginLeft: '1rem' }}>
              🏠 Back to Start
            </button>
          </div>

          {/* Answer Breakdown */}
          <div className="quiz-summary-list">
            <h4>Review Answers:</h4>
            {userAnswers.map((ans, idx) => (
              <div key={idx} className={`summary-item ${ans.isCorrect ? 'is-pass' : 'is-fail'}`}>
                <div className="summary-q">
                  <strong>Q{idx + 1}:</strong> {ans.question}
                </div>
                <div className="summary-ans">
                  <div><strong>Your answer:</strong> <span className={ans.isCorrect ? 'text-pass' : 'text-fail'}>{ans.selected}</span></div>
                  {!ans.isCorrect && (
                    <div><strong>Correct answer:</strong> <span className="text-pass">{ans.correct}</span></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDemo;
