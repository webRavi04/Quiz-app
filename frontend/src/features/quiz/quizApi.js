import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/quiz';

export const fetchQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions`);
  return response.data;
};
