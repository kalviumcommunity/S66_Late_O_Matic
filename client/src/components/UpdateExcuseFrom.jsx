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

      navigate("/excuses");
    } catch (error) {
      console.error("Error updating excuse:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Update Excuse</h2>
      <input type="text" value={excuse} onChange={(e) => setExcuse(e.target.value)} required className="w-full p-2 border rounded" />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update Excuse</button>
    </form>
  );
};

export default UpdateExcuseForm;
