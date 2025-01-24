import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../features/quiz/quizApi';
import {
  setQuestions,
  nextQuestion,
  previousQuestion,
  answerQuestion,
} from '../features/quiz/quizSlice';
import Question from './Question';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex } = useSelector((state) => state.quiz);

  const [timer, setTimer] = useState(15);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions();
      dispatch(setQuestions(data));
    };
    loadQuestions();
  }, [dispatch]);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
      setTimer(15);
    } else {
      navigate('/summary');
    }
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
    setTimer(15);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="layout-center">
      <div className="container">
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={(answer) =>
            dispatch(
              answerQuestion({
                questionId: questions[currentQuestionIndex]._id,
                answer,
              })
            )
          }
        />
        <div className="timer">Time Left: {timer}s</div>
        <div className="progress">
          Question {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className="navigation">
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;