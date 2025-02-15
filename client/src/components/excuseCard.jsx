// src/components/ExcuseCard.jsx
import React from "react";

const ExcuseCard = ({ excuse, author }) => {
  return (
    <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md max-w-md w-full">
      <h3 className="text-lg font-semibold">{excuse}</h3>
      <p className="text-sm text-gray-500">— {author || "Anonymous"}</p>
    </div>
  );
};

export default ExcuseCard;
