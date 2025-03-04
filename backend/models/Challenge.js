import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  funding: { type: String, required: true },
  deadline: { 
    type: Date, 
    required: true, 
    get: (date) => date.toISOString().split('T')[0]  
  },
  description: { type: String, required: true },
  status: { type: String, default: 'Visible' }
}, { timestamps: true, toJSON: { getters: true } });  

export default mongoose.model('Challenge', ChallengeSchema);

