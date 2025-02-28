// import React from "react";
// import ExcuseCard from "./excuseCard";

const Home = () => {
  // const dummyExcuses = [
  //   { excuse: "My goldfish was depressed.", author: "John Doe" },
  //   {excuse:"I slept late, So i woke up late",author:"Thameem"},
  //   {excuse: "My Fish was drowning",author:"Abdul" },
  // ];

  return (
    <div className="h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-3">Late-O-Matic</h1>
        <p className="text-lg">The funniest excuses for your tardiness.</p>
      </header>

      <section className="max-w-lg bg-white text-black p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>✔ Hilarious excuses to save your day!</li>
          <li>✔ Simple, easy-to-use UI</li>
          <li>✔ Manage your excuses effortlessly</li>
        </ul>
      </section>
{/* 
      <section className="flex flex-col items-center gap-4 mb-10">
        <h2 className="text-2xl font-bold">Recent Excuses</h2>
        {dummyExcuses.map((item, index) => (
          <ExcuseCard key={index} excuse={item.excuse} author={item.author} />
        ))}
      </section> */}

      <section className="flex justify-around w-full max-w-lg">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Log In
        </a>
        <a
          href="/signup"
          className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition duration-300"
        >
          Sign Up
        </a>
      </section>

      <footer className="absolute bottom-5 text-sm text-center">
        <p>&copy; 2025 Late-O-Matic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
