const mongoose = require('mongoose');

const seafoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  protein: { type: Number, required: true },
  omega3: { type: Number, required: true },
  calories: { type: Number, required: true },
  vitamins: { type: Number, required: true }
});

module.exports = mongoose.model("Seafood", seafoodSchema);

//module.exports = Seafood;
