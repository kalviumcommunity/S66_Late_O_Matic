import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExcuseCard = () => {
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchExcuses = async () => {
    try {
      const res = await fetch("http://localhost:8080/excuses");
      if (!res.ok) throw new Error("Failed to fetch excuses");
      const data = await res.json();
      setExcuses(data);
    } catch (err) {
      console.error("Error fetching excuses:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteExcuse = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/excuses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete excuse");

      setExcuses(excuses.filter((excuse) => excuse._id !== id));
    } catch (err) {
      console.error("Error deleting excuse:", err);
    }
  };

  useEffect(() => {
    fetchExcuses();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 p-4">
      <button onClick={() => navigate("/add-excuse")} className="bg-green-500 text-white py-2 px-4 rounded">
        Add New Excuse
      </button>

      {excuses.map((excuse) => (
        <div key={excuse._id} className="bg-gray-100 p-4 rounded shadow">
          <h3 className="font-semibold">{excuse.excuse}</h3>
          <p className="text-sm text-gray-600">- {excuse.author || "Anonymous"}</p>
          <button onClick={() => navigate(`/update-excuse/${excuse._id}`, { state: excuse })} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
            Edit
          </button>
          <button onClick={() => deleteExcuse(excuse._id)} className="bg-red-500 text-white px-2 py-1 rounded">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExcuseCard;
