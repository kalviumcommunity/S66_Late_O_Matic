import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const UpdateExcuseForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const excuseData = location.state || {}; // Get excuse data from state
  const [excuse, setExcuse] = useState(excuseData.excuse || "");

  // Redirect if no excuse data or not authenticated
  if (!excuseData._id || !token) {
    navigate("/excuses");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/excuses/${excuseData._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          excuse,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update excuse");
      }

      alert("Excuse updated successfully!");
      navigate("/my-excuses");
    } catch (error) {
      console.error("Error updating excuse:", error);
      alert("Failed to update excuse. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 shadow-lg rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Update Excuse</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            required
            className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px] resize-none"
            placeholder="Enter your updated excuse"
          />

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
              Update Excuse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExcuseForm;
