import express from 'express';
import Subscriber from '../../models/Subscriber.js';

const router = express.Router();

// Get all subscribers
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const subscribers = await Subscriber.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Subscriber.countDocuments();

    res.json({
      subscribers,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create subscriber
router.post('/', async (req, res) => {
  try {
    const newSubscriber = new Subscriber(req.body);
    const savedSubscriber = await newSubscriber.save();
    res.status(201).json(savedSubscriber);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete subscriber
router.delete('/:id', async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
