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

  // Log the cart items for debugging
  console.log("Cart Items:", cartItems);

  useEffect(() => {
    // Check if the cart has items and the user is logged in
    if (user && cartItems?.items?.length > 0) {
      const formattedCartItems = cartItems.items.map((item) => ({
        name: item.title, // Use title instead of ID
        quantity: item.quantity, // Default quantity to 1 if not provided
      }));

      console.log(formattedCartItems, "Formatted Cart Items"); // Debugging log
      // API call to calculate nutrients
      axios
        .post(
          "http://localhost:5000/api/shop/nutrientCalculation/calculate-nutrients",
          { cartItems: formattedCartItems }
        )
        .then((response) => {
          //console.log("API Response:", response.data);
          if(response){
            setTotalNutrients(response.data.totalNutrients);
            setSelectedItems(response.data.selectedItems);
          }
          else{
            setTotalNutrients({});
          setSelectedItems([]);
          }
          
        })
        .catch((error) => {
          // console.error(
          //   "Error fetching nutritional details:",
          //   error.response?.data || error.message
          // );
        });
    } else {
      // Reset states if cart is empty or user is not logged in
      setSelectedItems([]);
      setTotalNutrients({});
    }
  }, [user, cartItems]);

  // Redirect to login if user is not logged in
  if (!user) {
    return (
      <div className="p-8 flex flex-col md:flex-row items-center">
        <div className="mb-6 md:mb-0 md:mr-6">
          <img
            src={nutrientImage}
            alt="Login required"
            className="h-90 w-90 object-cover rounded shadow-lg"
            
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Login to View Your Nutritional Details
          </h1>
          <p className="text-gray-600 mb-4">
            To access personalized nutritional information based on your cart
            items, please log in to your account.
          </p>
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Login Page
          </button>
        </div>
      </div>
    );
  }

  // Render empty cart message
  if (cartItems?.items?.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-4">
          Start adding items to your cart to view nutritional details.
        </p>
        <button
          onClick={() => navigate("/shop/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Go to Shop By Category
        </button>
      </div>
    );
  }
console.log(selectedItems,"selected")
  // Render nutritional information
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Nutritional Details for Cart</h1>

      <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
      <div>
        {selectedItems.length > 0 ? (
          selectedItems.map((item, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>Protein: {item.protein || "N/A"} g</p>
              <p>Omega-3: {item.omega3 || "N/A"} g</p>
              <p>Calories: {item.calories || "N/A"} kcal</p>
              <p>Vitamins: {item.vitamins || "N/A"} mg</p>
            </div>
          ))
        ) : (
          <p>No nutritional information available for the selected items.</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Total Nutritional Information</h2>
      <div className="p-4 border border-gray-300 rounded">
        <p>Total Protein: {totalNutrients.protein || 0} g</p>
        <p>Total Omega-3: {totalNutrients.omega3 || 0} g</p>
        <p>Total Calories: {totalNutrients.calories || 0} kcal</p>
        <p>Total Vitamins: {totalNutrients.vitamins || 0} mg</p>
      </div>
    </div>
  );
};

export default UserNutrientPage;
