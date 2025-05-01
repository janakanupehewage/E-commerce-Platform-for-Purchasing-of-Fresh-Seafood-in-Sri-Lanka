import React, { useState, useEffect } from 'react';
import axios from 'axios';
import coverImage from '../../assets/cover.jpg';

const SeafoodPrediction = () => {
  const [seafoodName, setSeafoodName] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seafoodOptions, setSeafoodOptions] = useState([]);
  const [loadingSeafoods, setLoadingSeafoods] = useState(true);

  // Fetch available seafood options from backend
  useEffect(() => {
    const fetchSeafoodOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_FAST_API_URL}/seafoods`);
        // Filter out "Paraw" and "Pothubari" from the response
        const filteredOptions = response.data.filter(
          seafood => !['Paraw', 'Pothubari'].includes(seafood.name)
        );
        setSeafoodOptions(filteredOptions);
      } catch (err) {
        console.error('Failed to fetch seafood options:', err);
        // Fallback to default options if API fails (excluding Paraw and Pothubari)
        setSeafoodOptions([
          { name: 'Balaya', min_people: 1, max_people: 1000 },
          { name: 'Thalapath', min_people: 1, max_people: 1000 },
          { name: 'Thora', min_people: 1, max_people: 1000 },
          { name: 'Kelawalla', min_people: 1, max_people: 1000 },
          { name: 'Prawns', min_people: 1, max_people: 1000 },
          { name: 'Cuttlefish', min_people: 1, max_people: 1000 },
        ]);
      } finally {
        setLoadingSeafoods(false);
      }
    };

    fetchSeafoodOptions();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!seafoodName) {
      setError('Please select a seafood type');
      return;
    }
    
    if (numPeople < 1) {
      setError('Number of people must be at least 1');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await axios.post(`${import.meta.env.VITE_FAST_API_URL}/predict`, {
        seafood_name: seafoodName,
        num_people: parseInt(numPeople),
      });
      
      setPredictionResult({
        name: response.data.seafood_name,
        amount: response.data.predicted_amount_kg,
        people: response.data.num_people
      });
      
    } catch (err) {
      setError(err.response?.data?.detail || 'Prediction failed. Please try again.');
      setPredictionResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
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
          <p className="text-center text-gray-600 mb-4 px-4 py-2 bg-blue-50 rounded-lg shadow-md">
            This feature helps you predict the approximate amount of seafood needed to cook for special events, 
            such as parties, weddings, or corporate gatherings for up to 1000 people. The required quantity depends 
            on the number of guests and the type of seafood selected. Simply choose the seafood name you plan to 
            purchase, enter the number of attendees (1-1000), and the system will provide the recommended quantity 
            in kilograms. This ensures you save money, reduce food waste, and purchase the approximate right amount 
            of fresh seafood for your event.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Seafood Name:</label>
              <select
                value={seafoodName}
                onChange={(e) => setSeafoodName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={loadingSeafoods}
              >
                <option value="" disabled>
                  {loadingSeafoods ? 'Loading seafood options...' : 'Select a seafood name'}
                </option>
                {seafoodOptions.map((seafood) => (
                  <option key={seafood.name} value={seafood.name}>
                    {seafood.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of People (1-1000):
              </label>
              <input
                type="number"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
                min="1"
                max="1000"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !seafoodName}
              className={`${isSubmitting || !seafoodName ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200`}
            >
              {isSubmitting ? "Predicting..." : "Predict"}
            </button>
          </form>

          {predictionResult && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              <h3 className="font-medium">Prediction Result:</h3>
              <p>For {predictionResult.people} people, you'll need approximately:</p>
              <p className="font-semibold">{predictionResult.amount} kg of {predictionResult.name}</p>
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