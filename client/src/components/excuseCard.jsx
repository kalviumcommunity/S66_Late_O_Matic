// src/components/ExcuseCard.jsx
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const ExcuseCard = () => {
const [excuses, setExcuses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [liked, setLikedExcuses] = useState({});

useEffect(() => {
  fetch("http://localhost:8080/excuses")
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch excuses');
      }
      return res.json();
    })
    .then((data) => {
      setExcuses(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching excuses:", err);
      setError(err.message);
      setLoading(false);
    });
}, []);


  const handleLike = (excuseId) => {
    setLikedExcuses((prev) => ({
      ...prev,
      [excuseId]: !prev[excuseId],
    }));
  };

if (loading) return <p>Loading...</p>;
if (error) return <p className="text-red-500">Error: {error}</p>;

return (
  <div className="space-y-4">
    {excuses.map((excuse) => (
      <div key={excuse._id} className="relative bg-gray-100 text-black p-4 rounded-lg shadow-md max-w-md w-full">
        <h3 className="text-lg font-semibold">{excuse.excuse}</h3>
        <p className="text-sm text-gray-500">{excuse.author || "Anonymous"}</p>
        <button
          onClick={() => handleLike(excuse._id)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md transition-colors duration-200 hover:bg-white"
        >
          <Heart
            className={`w-6 h-6 transition-colors duration-200 ${
              liked[excuse._id] ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
            }`}
          />
        </button>
      </div>
    ))}
  </div>

  );
};

export default ExcuseCard;
