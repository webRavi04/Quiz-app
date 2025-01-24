const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

router.get('/questions', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const randomQuestions = await Question.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomQuestions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Submit ans
router.post('/submit', async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // Fetch all question IDs submitted
    const questionIds = answers.map((ans) => ans.questionId);

    // Fetch the correct answers from the db
    const questions = await Question.find({ _id: { $in: questionIds } });

    let correct = 0;

    // Compare submitted answers with the correct ans
    answers.forEach((ans) => {
      const question = questions.find((q) => q._id.toString() === ans.questionId);
      if (question && question.correctAnswer === ans.selectedAnswer) {
        correct++;
      }
    });

    const total = answers.length;
    const incorrect = total - correct;
    const score = ((correct / total) * 100).toFixed(2) + '%';

    // Save the answers to the db
    const submittedAnswers = new Answer({ userId, answers });
    await submittedAnswers.save();

    // Return the result summary
    res.json({
      message: 'Answers submitted successfully',
      total,
      correct,
      incorrect,
      score,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit answers' });
  }
});

module.exports = router;
