"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { signOut } = useAuthActions(); // Convex Auth actions
  const navigate = useNavigate(); // React Router navigation

  const handleSignOut = async () => {
    await signOut(); // log the user out
    navigate("/"); // redirect to login page or home
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-200 dark:border-gray-700">
          🌟 Dashboard
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-4">
          <button className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 text-left">
            🏠 Home
          </button>
          <button className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 text-left">
            📊 Analytics
          </button>
          <button className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 text-left">
            ⚙️ Settings
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome Back! 😎</h1>
          <div>
            <button
              onClick={handleSignOut} // <-- sign out logic
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex gap-4 mb-6 items-center">
          <span className="font-semibold">Filter:</span>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[{ label: "Todos", value: 12, emoji: "📝" },
            { label: "Completed", value: 8, emoji: "✅" },
            { label: "Pending", value: 4, emoji: "⏳" },
            { label: "Users", value: 5, emoji: "👥" }
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-2xl">{card.emoji}</p>
              <h2 className="text-xl font-semibold mt-2">{card.label}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Images / gallery section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Gallery 📸</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-xl overflow-hidden shadow hover:scale-105 transform transition"
              >
                <img
                  src={`https://picsum.photos/400/200?random=${n}`}
                  alt={`Image ${n}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable list */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow max-h-96 overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">Tasks 🗂</h2>
          <ul className="space-y-2">
            {Array.from({ length: 15 }, (_, i) => (
              <li
                key={i}
                className="p-2 border-b border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition flex justify-between"
              >
                Task {i + 1} {i % 2 === 0 ? "✅" : "⏳"}
                <span className="text-gray-400">#ID{i + 101}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
