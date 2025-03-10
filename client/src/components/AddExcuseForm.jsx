import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExcuseForm = () => {
  const [excuse, setExcuse] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/excuses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ excuse, author }),
      });

      if (!response.ok) throw new Error("Failed to add excuse");

      alert("New excuse added");
      setExcuse("");
      setAuthor("");
      navigate("/excuses");
    } catch (error) {
      console.error("Error adding excuse:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add New Excuse</h2>

        <input
          type="text"
          placeholder="Excuse"
          value={excuse}
          onChange={(e) => setExcuse(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"
          required
        />

        <input
          type="text"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-indigo-300 text-gray-900 font-medium py-3 rounded-lg shadow-md hover:bg-indigo-400 transition-transform transform hover:scale-105"
        >
          Add Excuse
        </button>
      </form>
    </div>
  );
};

export default AddExcuseForm;
