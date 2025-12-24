// src/Dashboard.tsx
"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    await signOut(); // log the user out
    // In Next.js, you might use: window.location.href = "/";
    window.location.href = "/";
  };

  const navItems = [
    { label: "Home", emoji: "🏠" },
    { label: "Analytics", emoji: "📊" },
    { label: "Settings", emoji: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md w-full fixed top-0 z-20">
        <button
          className="text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1 className="font-bold text-lg">Dashboard 🌟</h1>
        <button
          onClick={handleSignOut}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign Out
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-30`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-200 dark:border-gray-700">
          🌟 Dashboard
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 text-left"
              onClick={() => setSidebarOpen(false)}
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 pt-24 md:pt-6 md:ml-64 overflow-auto">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-6">
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
          {[
            { label: "Todos", value: 12, emoji: "📝" },
            { label: "Completed", value: 8, emoji: "✅" },
            { label: "Pending", value: 4, emoji: "⏳" },
            { label: "Users", value: 5, emoji: "👥" },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-2xl">{card.emoji}</p>
              <h2 className="text-xl font-semibold mt-2">{card.label}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
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
                  className="w-full h-48 sm:h-40 md:h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tasks List */}
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
