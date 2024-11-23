import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    const shuffledQuestions = shuffleArray([
      {
        question: 'What is 2 + 2?',
        choices: ['3', '4', '5', '6'],
        correctAnswer: '4',
      },
      {
        question: 'What is 3 + 1?',
        choices: ['2', '3', '4', '5'],
        correctAnswer: '4',
      },
      {
        question: 'What is 1 + 1?',
        choices: ['1', '2', '3', '4'],
        correctAnswer: '2',
      },
      {
        question: 'What is 5 - 2?',
        choices: ['2', '3', '4', '5'],
        correctAnswer: '3',
      },
      {
        question: 'What is 4 - 1?',
        choices: ['2', '3', '4', '5'],
        correctAnswer: '3',
      }
    ]);
    setQuestions(shuffledQuestions);
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const { question, choices, correctAnswer } = questions[activeQuestion] || {};

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const onRestart = () => {
    setQuestions(shuffleArray(questions));
    setActiveQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setSelectedAnswerIndex(null);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div style={styles.quizContainer}>
      {!showResult ? (
        <div>
          <div>
            <span style={styles.activeQuestionNo}>{addLeadingZero(activeQuestion + 1)}</span>
            <span style={styles.totalQuestion}>/{addLeadingZero(questions.length)}</span>
          </div>
          <h2>{question}</h2>
          <ul style={styles.optionsList}>
            {choices && choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                style={selectedAnswerIndex === index ? { ...styles.optionItem, ...styles.selectedAnswer } : styles.optionItem}>
                {answer}
              </li>
            ))}
          </ul>
          <div style={styles.flexRight}>
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null} style={selectedAnswerIndex === null ? { ...styles.nextButton, ...styles.nextButtonDisabled } : styles.nextButton}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.result}>
          <h3>Result</h3>
          <p>
            Total Questions: <span style={styles.resultSpan}>{questions.length}</span>
          </p>
          <p>
            Total Score: <span style={styles.resultSpan}>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span style={styles.resultSpan}>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span style={styles.resultSpan}>{result.wrongAnswers}</span>
          </p>
          <button onClick={onRestart} style={styles.restartButton}>Restart</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  quizContainer: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '10px',
    width: '90%',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '50px',
    backgroundImage: 'linear-gradient(90.04deg, #A13193 0.03%, #D27BB0 50%, #E091B9 99.96%)',
  },
  questionBlock: {
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
  },
  questionId: {
    fontSize: '18px',
    color: '#007bff',
  },
  questionText: {
    fontSize: '16px',
    color: '#333333',
  },
  optionsList: {
    listStyleType: 'none',
    padding: 0,
  },
  optionItem: {
    margin: '10px 0',
    textDecoration: 'none',
    listStyle: 'none',
    color: '#2d264b',
    fontSize: '16px',
    background: '#ffffff',
    border: '1px solid #eaeaea',
    borderRadius: '16px',
    padding: '11px',
    cursor: 'pointer',
  },
  selectedAnswer: {
    background: '#ffd6ff',
    border: '1px solid #800080',
  },
  nextButton: {
    background: 'linear-gradient(90.04deg, #800080 0.03%, #ffc0cb 99.96%)',
    borderRadius: '9px',
    fontSize: '18px',
    color: '#ffffff',
    padding: '10px 42px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '15px',
  },
  nextButtonDisabled: {
    background: '#e7e8e9',
    color: '#9fa3a9',
    cursor: 'not-allowed',
  },
  flexRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  result: {
    textAlign: 'center',
  },
  resultSpan: {
    color: '#800080',
    fontSize: '22px',
  },
  activeQuestionNo: {
    fontSize: '32px',
    fontWeight: '500',
    color: '#800080',
  },
  totalQuestion: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#e0dee3',
  },
  restartButton: {
    background: 'linear-gradient(90.04deg, #A13193 0.03%, #D27BB0 50%, #E091B9 99.96%)',
    borderRadius: '9px',
    fontSize: '18px',
    color: '#ffffff',
    padding: '10px 42px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '15px',
  },
};

export default Quiz;
