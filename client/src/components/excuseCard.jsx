import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const ExcuseCard = () => {
  const [excuses, setExcuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [randomExcuse, setRandomExcuse] = useState(null);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    fetch("http://localhost:8080/excuses")
      .then((res) => res.json())
      .then((data) => setExcuses(data))
      .catch((err) => console.error("Error fetching excuses:", err));

    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/excuses/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to like/unlike excuse");

      const updatedExcuse = await response.json();

      setExcuses((prev) =>
        prev.map((excuse) =>
          excuse._id === id
            ? { ...excuse, likes: updatedExcuse.likes, liked_by: updatedExcuse.liked_by }
            : excuse
        )
      );
    } catch (error) {
      console.error("Error liking excuse:", error);
    }
  };

  // Filter excuses based on selected user
  const filteredExcuses = selectedUser
    ? excuses.filter((excuse) => excuse.created_by?._id === selectedUser)
    : excuses;

  const showRandomExcuse = () => {
    if (filteredExcuses.length === 0) return;
    const idx = Math.floor(Math.random() * filteredExcuses.length);
    setRandomExcuse(filteredExcuses[idx]);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-6">Excuses List</h2>

      {/* Dropdown to Filter by User */}
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="p-2 border rounded-lg mb-4 bg-gray-800 text-white"
      >
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>

      <button
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        onClick={showRandomExcuse}
      >
        Show Me a Random Excuse
      </button>

      {randomExcuse && (
        <motion.div
          className="bg-pink-700 text-white p-6 rounded-xl shadow-lg mb-8 max-w-xl text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-2xl font-bold mb-2">{randomExcuse.excuse}</p>
          <p className="text-gray-200 text-sm mb-2">By: {randomExcuse?.created_by?.username || "Unknown"}</p>
          <p className="text-gray-300">👍 {randomExcuse.likes} Likes</p>
        </motion.div>
      )}

      <div className="w-full max-w-3xl">
        {filteredExcuses.length === 0 ? (
          <p className="text-gray-400 text-center">No excuses found.</p>
        ) : (
          filteredExcuses.map((excuse) => (
            <motion.div
              key={excuse._id}
              className="bg-gray-800 shadow-lg p-4 rounded-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-semibold text-white">{excuse.excuse}</p>
              <p className="text-gray-400 text-sm">By: {excuse?.created_by?.username || "Unknown"}</p>

              <div className="flex items-center gap-3 mt-2">
                <p className="text-gray-300">👍 {excuse.likes} Likes</p>
                {loggedInUser && (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleLike(excuse._id)}
                  >
                    👍 Like
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {loggedInUser && (
        <button
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/my-excuses")}
        >
          My Excuses
        </button>
      )}
    </div>
  );
};

export default ExcuseCard;
