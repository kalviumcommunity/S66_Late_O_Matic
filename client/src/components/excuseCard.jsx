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
      alert("Deleting excuse");

      setExcuses(excuses.filter((excuse) => excuse._id !== id));
    } catch (err) {
      console.error("Error deleting excuse:", err);
    }
  };

  useEffect(() => {
    fetchExcuses();
  }, []);

  if (loading) return <p className="text-gray-600 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4">
      <button
        onClick={() => navigate("/add-excuse")}
        className="mb-6 px-6 py-3 bg-green-300 text-gray-900 font-medium rounded-lg shadow-md hover:bg-green-400 transition-transform transform hover:scale-105"
      >
        Add New Excuse
      </button>

      <div className="w-full max-w-lg space-y-4">
        {excuses.map((excuse) => (
          <div key={excuse._id} className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg text-gray-800">{excuse.excuse}</h3>
            <p className="text-sm text-gray-600 mt-1">- {excuse.author || "Anonymous"}</p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => navigate(`/update-excuse/${excuse._id}`, { state: excuse })}
                className="px-4 py-2 bg-yellow-300 text-gray-900 font-medium rounded-lg shadow-md hover:bg-yellow-400 transition-transform transform hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExcuse(excuse._id)}
                className="px-4 py-2 bg-red-300 text-gray-900 font-medium rounded-lg shadow-md hover:bg-red-400 transition-transform transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcuseCard;
