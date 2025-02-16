import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import nutrientImage from '../../assets/nutrientsDetails.jpg';

const UserNutrientPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [totalNutrients, setTotalNutrients] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && cartItems?.items?.length > 0) {
      const formattedCartItems = cartItems.items.map((item) => ({
        name: item.title,
        quantity: item.quantity,
      }));

      axios
        .post(
          "http://localhost:5000/api/shop/nutrientCalculation/calculate-nutrients",
          { cartItems: formattedCartItems }
        )
        .then((response) => {
          if (response) {
            setTotalNutrients(response.data.totalNutrients);
            setSelectedItems(response.data.selectedItems);
          } else {
            setTotalNutrients({});
            setSelectedItems([]);
          }
        })
        .catch((error) => {
          // Handle error if needed
        });
    } else {
      setSelectedItems([]);
      setTotalNutrients({});
    }
  }, [user, cartItems]);

  if (!user) {
    return (
      <div className="min-h-screen p-8 flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-300 via-green-300 to-red-300 rounded-lg shadow-lg">
        <div className="mb-6 md:mb-0 md:mr-6">
          <img
            src={nutrientImage}
            alt="Login required"
            className="h-80 w-80 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Login to View Your Nutritional Details
          </h1>
          <p className="text-lg text-white mb-6">
            To access personalized nutritional information based on your cart items, please log in to your account.
          </p>
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go to Login Page
          </button>
        </div>
      </div>
    );
  }

  if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
    return (
      <div className="min-h-screen p-8 text-center bg-gradient-to-r from-blue-300 via-green-300 to-red-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Cart is Empty</h1>
        <p className="text-lg text-white mb-6">
          Start adding items to your cart to view nutritional details.
        </p>
        <button
          onClick={() => navigate("/shop/home")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Shop By Category
        </button>
      </div>
    );
  }

  const hasNutritionalData = (item) => {
    return (
      item.protein && item.protein !== "N/A" &&
      item.omega3 && item.omega3 !== "N/A" &&
      item.calories && item.calories !== "N/A" &&
      item.vitamins && item.vitamins !== "N/A"
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-green-300 via-blue-350 to-purple-400 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-white">Nutritional Details for Cart</h1>

      <h2 className="text-2xl font-semibold mb-4 text-white">Selected Items</h2>
      <div>
        {selectedItems.length > 0 ? (
          selectedItems.filter(hasNutritionalData).length > 0 ? (
            selectedItems.map((item, index) => {
              const protein = item.protein === "N/A" ? "No data available" : item.protein;
              const omega3 = item.omega3 === "N/A" ? "No data available" : item.omega3;
              const calories = item.calories === "N/A" ? "No data available" : item.calories;
              const vitamins = item.vitamins === "N/A" ? "No data available" : item.vitamins;

              return (
                <div
                  key={index}
                  className="mb-6 p-6 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{item.title} Per 100g</h3>
                  <p className="text-gray-700">Protein: {protein} g</p>
                  <p className="text-gray-700">Omega-3: {omega3} mg</p>
                  <p className="text-gray-700">Calories: {calories} kcal</p>
                  <p className="text-gray-700">Vitamin E: {vitamins} mg</p>
                </div>
              );
            })
          ) : (
            <p className="text-lg text-gray-600 italic font-semibold mt-4 mb-4">
              No nutritional information available for the selected items.
            </p>
          )
        ) : (
          <p className="text-lg text-gray-600">No items selected.</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white">Total Nutritional Information</h2>
      <div className="p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md">
        <p className="text-gray-700">Total Protein: {totalNutrients.protein || 0} g</p>
        <p className="text-gray-700">Total Omega-3: {totalNutrients.omega3 || 0} mg</p>
        <p className="text-gray-700">Total Calories: {totalNutrients.calories || 0} kcal</p>
        <p className="text-gray-700">Total Vitamin E: {totalNutrients.vitamins || 0} mg</p>
      </div>
    </div>
  );
};

export default UserNutrientPage;
