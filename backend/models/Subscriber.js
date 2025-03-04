import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model('Subscriber', SubscriberSchema); 
