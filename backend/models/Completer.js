import mongoose from 'mongoose';

const CompleterSchema = new mongoose.Schema({
  project: String,
  profile: String,
  position: String,
  description: String,
  funding: String,
  socialLinks: String,
  status: {
    type: String,
    default: 'Active'
  },
  visibility: {
    type: String,
    default: 'Public'
  }
}, { timestamps: true });

export default mongoose.model('Completer', CompleterSchema);
