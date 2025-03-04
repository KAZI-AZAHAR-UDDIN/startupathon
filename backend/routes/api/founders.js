import express from 'express';
import Founder from '../../models/Founder.js';

const router = express.Router();

// Get all founders
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = {
      $or: [
        { profile: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ]
    };

    const founders = await Founder.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Founder.countDocuments(query);

    res.json({
      founders,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create founder
router.post('/', async (req, res) => {
  try {
    const newFounder = new Founder(req.body);
    const savedFounder = await newFounder.save();
    res.status(201).json(savedFounder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res)=>{
    try {
        
       await Founder.findByIdAndDelete(req.params.id);
       res.json({ message:"completed data successfully"});
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})
export default router; 
