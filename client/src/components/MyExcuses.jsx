import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MyExcuses = () => {
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newExcuse, setNewExcuse] = useState("");
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    // Debug: Log the user object to see what's available
    console.log("User object:", user);
    console.log("User ID:", user?.id);
    console.log("User _id:", user?._id);

    const fetchMyExcuses = async () => {
      try {
        // Try to get user ID from different possible properties
        const userId = user?.id || user?._id || user?.userId;
        
        if (!userId) {
          console.error("No user ID found in user object:", user);
          // Clear localStorage and redirect to login
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert("User session is invalid. Please log in again.");
          navigate("/login");
          return;
        }

        console.log("Using user ID:", userId);
        
        const response = await fetch(`http://localhost:8080/excuses/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user excuses");

        const data = await response.json();
        setExcuses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching user excuses:", err);
        setError("Failed to load your excuses.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyExcuses();
  }, [user, token, navigate]);

  const handleAddExcuse = async () => {
    if (!newExcuse.trim()) return alert("Excuse cannot be empty!");

    try {
      const response = await fetch(`http://localhost:8080/excuses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ excuse: newExcuse }),
      });

      if (!response.ok) throw new Error("Failed to add excuse");

      const addedExcuse = await response.json();
      setExcuses([addedExcuse.excuse, ...excuses]);
      setNewExcuse("");
    } catch (error) {
      console.error("Error adding excuse:", error);
      setError("Failed to add excuse.");
    }
  };

  const handleEditExcuse = (excuse) => {
    navigate("/update-excuse", { state: excuse });
  };

  const handleDeleteExcuse = async (excuseId) => {
    if (!confirm("Are you sure you want to delete this excuse?")) return;

    try {
      const response = await fetch(`http://localhost:8080/excuses/${excuseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete excuse");

      setExcuses(excuses.filter(excuse => excuse._id !== excuseId));
    } catch (error) {
      console.error("Error deleting excuse:", error);
      alert("Failed to delete excuse.");
    }
  };

  if (!user || !token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-6">My Excuses</h2>

      <div className="w-full max-w-3xl">
        {/* Add New Excuse */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Add New Excuse</h3>
          <div className="flex gap-3">
            <textarea
              className="flex-grow p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter a new excuse..."
              value={newExcuse}
              onChange={(e) => setNewExcuse(e.target.value)}
              rows="3"
            />
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all whitespace-nowrap"
              onClick={handleAddExcuse}
            >
              Add Excuse
            </button>
          </div>
        </motion.div>

        {/* Excuses List */}
        {loading ? (
          <p className="text-gray-400 text-center">Loading your excuses...</p>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        ) : excuses.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 text-lg mb-4">You haven&apos;t added any excuses yet.</p>
            <p className="text-gray-500">Start by adding your first excuse above!</p>
          </motion.div>
        ) : (
          excuses.map((excuse, index) => (
            <motion.div
              key={excuse._id}
              className="bg-gray-800 shadow-lg p-6 rounded-xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <p className="text-lg font-semibold text-white mb-3">{excuse.excuse}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">
                  Created: {new Date(excuse.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-all"
                    onClick={() => handleEditExcuse(excuse)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all"
                    onClick={() => handleDeleteExcuse(excuse._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyExcuses;
