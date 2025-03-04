import mongoose from 'mongoose';

const FounderSchema = new mongoose.Schema({
  profile: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  location: String,
  bioHighlights: String,
  languages: [String],
  regionsOfExpertise: [String],
techExpertise: [String],
businessExpertise: [String],
socialLinks: String

}, { timestamps: true });

export default mongoose.model('Founder', FounderSchema); 
