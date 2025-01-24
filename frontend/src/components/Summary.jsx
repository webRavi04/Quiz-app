import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateScore, resetQuiz } from '../features/quiz/quizSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
  const { score, questions, answers } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calculateScore());

    const submitAnswers = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/quiz/submit', {
          userId: 'exampleUserId',
          answers: answers.map((a) => ({
            questionId: a.questionId,
            selectedAnswer: a.answer,
          })),
        });
        console.log(response.data.message);
      } catch (error) {
        console.error('Failed to submit answers:', error);
      }
    };

    submitAnswers();
  }, [dispatch, answers]);

  return (
    <div className="layout-center">
      <div className="container">
        <h2>Quiz Summary</h2>
        <p>
          You answered {score} / {questions.length} questions correctly.
        </p>
        <button
          onClick={() => {
            dispatch(resetQuiz());
            navigate('/');
          }}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Summary;