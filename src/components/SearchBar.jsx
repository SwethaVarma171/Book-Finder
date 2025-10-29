import React from "react";

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search by title, author, or subject..."
        className="flex-grow border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
         aria-label="Search books"
      />
      <button
        onClick={onSearch}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        aria-label="Search button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
