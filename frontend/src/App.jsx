import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Quiz from './components/Quiz';
import Summary from './components/Summary';
import './styles/styles.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;