import { useState, useEffect } from "react";

const UserDropdown = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users") // Fetch all users
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <select onChange={(e) => onSelectUser(e.target.value)} className="p-2 border rounded w-full">
      <option value="">Select a User</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;
