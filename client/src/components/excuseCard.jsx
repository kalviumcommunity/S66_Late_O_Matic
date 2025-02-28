import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import the form component

const ExcuseCard = () => {
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchExcuses = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/excuses"); // Correct API endpoint
      if (!res.ok) throw new Error("Failed to fetch excuses");
      const data = await res.json();
      setExcuses(data);
    } catch (err) {
      console.error("Error fetching excuses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExcuses(); // Fetch excuses on component mount
  }, []);

  const addExcuseToList = (newExcuse) => {
    setExcuses((prev) => [newExcuse, ...prev]); // Add the new excuse directly to the list
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 p-4">
      <button
        onClick={() => navigate("/add-excuse")}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Add New Excuse
      </button>

      {/* AddExcuseForm is embedded to instantly update the list */}
      {/* <AddExcuseForm onExcuseAdded={addExcuseToList} /> */}

      {excuses.map((excuse) => (
        <div key={excuse._id} className="bg-gray-100 p-4 rounded shadow">
          <h3 className="font-semibold">{excuse.excuse}</h3>
          <p className="text-sm text-gray-600">- {excuse.author || "Anonymous"}</p>
        </div>
      ))}
    </div>
  );
};

export default ExcuseCard;
