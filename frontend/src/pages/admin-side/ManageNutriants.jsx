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
      const response = await axios.get(`http://localhost:5000/api/admin/nutrientsHandle`);
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
      : `http://localhost:5000/api/admin/nutrientsHandle/add`;
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Nutrients</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name" },
          { label: "Protein (g)", name: "protein", type: "number" },
          { label: "Omega-3 (mg)", name: "omega3", type: "number" },
          { label: "Calories", name: "calories", type: "number" },
          { label: "Vitamin E (mg)", name: "vitamins", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          {isEditing ? "Update Seafood" : "Add Seafood"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Seafood List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              {["Name", "Protein (g)", "Omega-3 (mg)", "Calories", "Vitamin E (mg)", "Actions"].map((header) => (
                <th key={header} className="px-4 py-2 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seafoodList.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.protein}</td>
                <td className="px-4 py-2">{item.omega3}</td>
                <td className="px-4 py-2">{item.calories}</td>
                <td className="px-4 py-2">{item.vitamins}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageNutrient;
