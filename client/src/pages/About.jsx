import React from 'react';

const About = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
    <h1 className="text-4xl font-bold mb-4">About Late-O-Matic</h1>
    <p className="max-w-xl text-lg text-center mb-8">
      Late-O-Matic is your ultimate excuse generator for those moments when you're running late. Log in, browse hilarious excuses, and manage your own! Built with React, Express, MongoDB, and styled with Tailwind CSS (dark mode by default). Enjoy smooth animations and a fun, responsive experience.
    </p>
    <a href="/" className="px-6 py-3 bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-700 transition">Back to Home</a>
  </div>
);

export default About; 