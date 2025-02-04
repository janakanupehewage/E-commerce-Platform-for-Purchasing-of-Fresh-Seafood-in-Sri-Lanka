import React, { useState } from 'react';
import axios from 'axios';
import coverImage from '../../assets/cover.jpg'

const SeafoodPrediction = () => {
  const [seafoodName, setSeafoodName] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState('');

  // List of seafood names
  const seafoodNames = [
    'Balaya',
    'Thalapath',
    'Thora',
    'Kelawalla',
    'Pothubari',
    'Prawns',
    'Cuttlefish',
    'Paraw',
  ];

  // Handle dropdown and number input changes
  const handleSeafoodNameChange = (e) => setSeafoodName(e.target.value);
  const handleNumPeopleChange = (e) => setNumPeople(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to FastAPI backend
      const response = await axios.post('https://janaka-nupehewage-seafood-quantity-prediction.hf.space/predict', {
        seafood_name: seafoodName,
        num_people: numPeople,
      });
      setPredictionResult(response.data.predicted_amount_kg);
      setError('');
    } catch (err) {
      setError('Error: ' + err.response.data.detail || 'Unknown error');
      setPredictionResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section with Photo */}
        <div className="flex justify-center">
          <img
            src={coverImage}
            alt="Seafood"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section with Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-4">Seafood Amount Prediction</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Seafood Name:</label>
              <select
                value={seafoodName}
                onChange={handleSeafoodNameChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select a seafood name
                </option>
                {seafoodNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of People:</label>
              <input
                type="number"
                value={numPeople}
                onChange={handleNumPeopleChange}
                min="1"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Predict
            </button>
          </form>

          {predictionResult && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              <h3 className="font-medium">Prediction:</h3>
              <p>Predicted amount of seafood needed: {predictionResult} kg</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
              <h3 className="font-medium">Error:</h3>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeafoodPrediction;
