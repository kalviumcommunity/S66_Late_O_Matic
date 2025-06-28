import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AddExcuseForm = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [excuse, setExcuse] = useState("");

  if (!user || !token) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/excuses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          excuse,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add excuse");
      }

      alert("Excuse added successfully!");
      navigate("/my-excuses");
    } catch (error) {
      console.error("Error adding excuse:", error);
      alert("Failed to add excuse. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div 
        className="bg-gray-800 p-8 shadow-lg rounded-xl w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">Add New Excuse</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Your Excuse
            </label>
            <textarea
              value={excuse}
              onChange={(e) => setExcuse(e.target.value)}
              required
              className="w-full p-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[120px]"
              placeholder="Enter your hilarious excuse for being late..."
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/my-excuses")}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Excuse
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddExcuseForm;
