import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch default books on homepage load
  useEffect(() => {
    fetchDefaultBooks();
  }, []);

  const fetchDefaultBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=popular`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 20)); // show first 20
    } catch (err) {
      setError("Unable to load default books!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch books when user searches
  const fetchBooks = async () => {
    if (!query.trim()) {
      setError("Please enter a search term!");
      return;
    }

    setError("");
    setLoading(true);
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await response.json();

      if (data.docs.length === 0) {
        setError("No books found!");
      } else {
        setBooks(data.docs.slice(0, 20));
      }
    } catch (err) {
      setError("Something went wrong while fetching data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">📚 Book Finder</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={fetchBooks} />

      {loading && <p className="text-gray-600 mt-4">Loading books...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-8 w-full max-w-6xl">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default App;
