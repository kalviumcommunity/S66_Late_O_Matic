import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddExcuseForm = () => {
  const [excuse, setExcuse] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const onExcuseAdded = ()=>{
    alert("New excuse added")
    setExcuse("");
    setAuthor("");
    navigate("/excuses")
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/add-excuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ excuse, author }),
      });

      if (!response.ok) throw new Error("Failed to add excuse");

      const newExcuse = await response.json();
      console.log(newExcuse)
      onExcuseAdded();

    } catch (error) {
      console.error("Error adding excuse:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Add New Excuse</h2>
      <input
        type="text"
        placeholder="Excuse"
        value={excuse}
        onChange={(e) => setExcuse(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Author (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Add Excuse
      </button>
    </form>
  );
};

export default AddExcuseForm;
