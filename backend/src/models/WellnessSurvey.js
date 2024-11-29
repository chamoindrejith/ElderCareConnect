import mongoose from 'mongoose';

const wellnessSurveySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  surveyDate: { type: Date, default: Date.now },
  questions: [String],
  responses: [String]
});

const WellnessSurvey = mongoose.model('WellnessSurvey', wellnessSurveySchema);
export default WellnessSurvey;
