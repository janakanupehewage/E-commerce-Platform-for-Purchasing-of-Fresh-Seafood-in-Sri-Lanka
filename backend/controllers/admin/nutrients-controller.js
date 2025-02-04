const Seafood = require('../../models/SeafoodNeutrient')

// Add new seafood item
const addSeafood = async (req, res) => {
  const { name, protein, omega3, calories, vitamins } = req.body;
  try {
    const seafood = new Seafood({ name, protein, omega3, calories, vitamins });
    await seafood.save();
    res.status(201).json({ message: 'Seafood added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add seafood item' });
  }
};

// Get all seafood items
const getAllSeafood = async (req, res) => {
  try {
    const seafoodItems = await Seafood.find();
    res.status(200).json(seafoodItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seafood items' });
  }
};

// Update seafood item
const updateSeafood = async (req, res) => {
  const { name, protein, omega3, calories, vitamins } = req.body;
  try {
    const seafood = await Seafood.findByIdAndUpdate(req.params.id, {
      name,
      protein,
      omega3,
      calories,
      vitamins,
    });
    res.status(200).json({ message: 'Seafood updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating seafood item' });
  }
};

module.exports = {addSeafood, getAllSeafood, updateSeafood};
