import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateExcuseForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const excuseData = location.state || {};
  const [excuse, setExcuse] = useState(excuseData.excuse || "");
  const [author, setAuthor] = useState(excuseData.author || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/excuses/${excuseData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ excuse, author }),
      });

      if (!response.ok) throw new Error("Failed to update excuse");

      alert("Excuse updated successfully!");
      navigate("/excuses");
    } catch (error) {
      console.error("Error updating excuse:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Update Excuse</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Excuse"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Author (Optional)"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Update Excuse
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExcuseForm;
