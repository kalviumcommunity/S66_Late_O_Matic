const Home = () => {
  return (
    <div className="h-screen bg-slate-200 flex flex-col items-center justify-center text-gray-900 px-6">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold tracking-tight mb-2 text-gray-800 drop-shadow-md">
          Late-O-Matic
        </h1>
        <p className="text-lg text-gray-700 opacity-90">The funniest excuses for your tardiness.</p>
      </header>

      <section className="max-w-lg bg-white text-gray-900 p-8 rounded-2xl shadow-lg mb-10 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Why Choose Us?</h2>
        <ul className="list-none space-y-3">
          <li className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✔</span> Hilarious excuses to save your day!
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✔</span> Simple, easy-to-use UI
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✔</span> Manage your excuses effortlessly
          </li>
        </ul>
      </section>

      <section className="flex gap-6">
        <a
          href="/login"
          className="px-6 py-3 rounded-lg bg-indigo-300 text-gray-900 font-medium shadow-lg hover:bg-indigo-400 transition-transform transform hover:scale-105"
        >
          Log In
        </a>
        <a
          href="/sign-up"
          className="px-6 py-3 rounded-lg bg-pink-300 text-gray-900 font-medium shadow-lg hover:bg-pink-400 transition-transform transform hover:scale-105"
        >
          Sign Up
        </a>
      </section>

      <footer className="absolute bottom-5 text-sm text-center opacity-80">
        <p>&copy; 2025 Late-O-Matic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
