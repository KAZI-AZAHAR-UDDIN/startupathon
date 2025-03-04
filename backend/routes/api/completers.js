import express from 'express';
import Completer from '../../models/Completer.js';

const router = express.Router();

// Get all completers
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = {
      $or: [
        { project: { $regex: search, $options: 'i' } },
        { profile: { $regex: search, $options: 'i' } }
      ]
    };

    const completers = await Completer.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Completer.countDocuments(query);

    res.json({
      completers,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create completer
router.post('/', async (req, res) => {
  try {
    const newCompleter = new Completer(req.body);
    const savedCompleter = await newCompleter.save();
    res.status(201).json(savedCompleter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete completer
router.delete('/:id', async (req, res) => {
  try {
    await Completer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Completer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
