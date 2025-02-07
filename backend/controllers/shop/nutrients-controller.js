const Seafood = require('../../models/SeafoodNeutrient');

// Calculate nutrients for cart items
// Calculate nutrients for cart items
const calculateNutrients = async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart items are required.' });
  }

  let totalNutrients = {
    protein: 0,
    omega3: 0,
    calories: 0,
    vitamins: 0,
  };
  const selectedItems = [];

  for (const item of cartItems) {
    try {
      // Find the seafood by its name (or title)
      const seafood = await Seafood.findOne({ name: item.name });

      if (!seafood) {
        // If no match is found, add the item with default values (e.g., N/A or 0)
        selectedItems.push({
          title: item.name,
          protein: "N/A", // Default value
          omega3: "N/A", // Default value
          calories: "N/A", // Default value
          vitamins: "N/A", // Default value
          quantity: item.quantity,
        });

        //console.log(`Seafood with name "${item.name}" not found, using default values.`);
        continue;
      }

      // Add the found item to selectedItems
      selectedItems.push({
        title: seafood.name,
        protein: seafood.protein || 0,
        omega3: seafood.omega3 || 0,
        calories: seafood.calories || 0,
        vitamins: seafood.vitamins || 0,
        quantity: item.quantity,
      });

      // Accumulate nutrients
      totalNutrients.protein += seafood.protein ? seafood.protein * item.quantity : 0;
      totalNutrients.omega3 += seafood.omega3 ? seafood.omega3 * item.quantity : 0;
      totalNutrients.calories += seafood.calories ? seafood.calories * item.quantity : 0;
      totalNutrients.vitamins += seafood.vitamins ? seafood.vitamins * item.quantity : 0;

    } catch (error) {
      console.error(`Error fetching seafood with name "${item.name}": `, error);
      return res.status(500).json({ message: 'Error calculating nutrients' });
    }
  }

  // If no items were found, send an empty response
  if (selectedItems.length === 0) {
    return res.status(404).json({ message: 'No matching items found in the database.', totalNutrients });
  }

  // Send the response
  res.status(200).json({ selectedItems, totalNutrients });
};


module.exports = { calculateNutrients };
