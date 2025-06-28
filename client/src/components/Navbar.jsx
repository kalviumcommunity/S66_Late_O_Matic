import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-gray-950 text-white shadow flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-xl tracking-tight hover:text-indigo-400 transition">Late-O-Matic</Link>
        <Link to="/excuses" className="hover:text-indigo-400 transition">Excuses</Link>
        {user && <Link to="/my-excuses" className="hover:text-indigo-400 transition">My Excuses</Link>}
        {user && <Link to="/add-excuse" className="hover:text-indigo-400 transition">Add Excuse</Link>}
        <Link to="/about" className="hover:text-indigo-400 transition">About</Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm opacity-80">Hi, {user.username}</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">Login</Link>
            <Link to="/sign-up" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 