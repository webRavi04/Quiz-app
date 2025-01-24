import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    answerQuestion(state, action) {
      const { questionId, answer } = action.payload;
      const existingAnswer = state.answers.find((a) => a.questionId === questionId);
      if (existingAnswer) {
        existingAnswer.answer = answer;
      } else {
        state.answers.push({ questionId, answer });
      }
    },
    nextQuestion(state) {
      state.currentQuestionIndex++;
    },
    previousQuestion(state) {
      if (state.currentQuestionIndex > 0) state.currentQuestionIndex--;
    },
    calculateScore(state) {
      state.score = state.answers.reduce((total, answer) => {
        const question = state.questions.find((q) => q._id === answer.questionId);
        return question && question.correctAnswer === answer.answer ? total + 1 : total;
      }, 0);
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.score = 0;
    },
  },
});

export const {
  setQuestions,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  calculateScore,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
