const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
      selectedAnswer: { type: String, required: true },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Answer', answerSchema);
