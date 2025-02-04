import axios from "axios";
import React, { useState, useEffect } from "react";


const AdminManageNutrient = () => {
  const [seafoodList, setSeafoodList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    protein: "",
    omega3: "",
    calories: "",
    vitamins: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  const fetchSeafood = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/nutrientsHandle");
      setSeafoodList(response.data);
    } catch (error) {
        console.log(error);
      console.error("Error fetching seafood items:", error);
      alert("Error fetching seafood items. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isEditing
      ? `http://localhost:5000/api/admin/nutrientsHandle/update/${editingId}`
      : "http://localhost:5000/api/admin/nutrientsHandle/add";
    const method = isEditing ? "put" : "post";

    try {
      await axios({ method, url: endpoint, data: form });
      alert(isEditing ? "Seafood updated successfully!" : "Seafood added successfully!");
      setForm({ name: "", protein: "", omega3: "", calories: "", vitamins: "" });
      setIsEditing(false);
      fetchSeafood();
    } catch (error) {
      console.error("Error saving seafood item:", error);
      alert("Error saving seafood item. Please try again.");
    }
  };

  const startEdit = (item) => {
    setForm(item);
    setIsEditing(true);
    setEditingId(item._id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchSeafood();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Protein (g)</label>
          <input
            type="number"
            name="protein"
            value={form.protein}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Omega-3 (g)</label>
          <input
            type="number"
            name="omega3"
            value={form.omega3}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Calories</label>
          <input
            type="number"
            name="calories"
            value={form.calories}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Vitamins (mg)</label>
          <input
            type="number"
            name="vitamins"
            value={form.vitamins}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Seafood" : "Add Seafood"}
        </button>
      </form>
      <h2 className="text-xl font-bold mb-4">Seafood List</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Protein (g)</th>
            <th className="border border-gray-300 px-4 py-2">Omega-3 (g)</th>
            <th className="border border-gray-300 px-4 py-2">Calories</th>
            <th className="border border-gray-300 px-4 py-2">Vitamins (mg)</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {seafoodList.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.protein}</td>
              <td className="border border-gray-300 px-4 py-2">{item.omega3}</td>
              <td className="border border-gray-300 px-4 py-2">{item.calories}</td>
              <td className="border border-gray-300 px-4 py-2">{item.vitamins}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => startEdit(item)}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageNutrient;
