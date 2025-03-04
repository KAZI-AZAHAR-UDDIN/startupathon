import express from 'express';
import Challenge from '../../models/Challenge.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      
      const { page = 1, limit = 10, search = '' } = req.query;
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
  
      const query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
     
  
      const challenges = await Challenge.find(query)
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum);
      
  
      const count = search.trim()
        ? await Challenge.countDocuments(query)
        : await Challenge.estimatedDocumentCount();
     
  
     
      res.json({
        challenges,
        totalPages: Math.ceil(count / limitNum),
        currentPage: pageNum
      });
    } catch (err) {
      console.error('Error in GET /api/challenges:', err); // Better error logging
      res.status(500).json({ error: err.message });
    }
  });


router.post('/', async (req, res) => {
    const { title, funding, deadline, description } = req.body;
  
    if (!title || !funding || !description || !deadline) {
      return res.status(400).json({ error: 'Title, Funding, Deadline, and Description are required.' });
    }
  
    const deadlineDate = new Date(deadline);
    const today = new Date();   // ✅ Define today
    today.setHours(0, 0, 0, 0); // ✅ Ensure accurate comparison

    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({ error: 'Invalid deadline format.' });
    }

    if (deadlineDate < today) {
      return res.status(400).json({ error: 'Deadline cannot be in the past.' });
    }


  
    try {
      const newChallenge = new Challenge({ title, funding, deadline, description });
      const savedChallenge = await newChallenge.save();
      res.status(201).json(savedChallenge);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const deletedChallenge = await Challenge.findByIdAndDelete(req.params.id);
      if (!deletedChallenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }
      res.json({ message: 'Challenge deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

export default router;