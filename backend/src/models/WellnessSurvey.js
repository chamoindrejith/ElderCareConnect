const mongoose =require('mongoose');

const wellnessSurveySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  surveyDate: { type: Date, default: Date.now },
  questions: [String],
  responses: [String]
});

module.exports = mongoose.model('WellnessSurvey', wellnessSurveySchema);

