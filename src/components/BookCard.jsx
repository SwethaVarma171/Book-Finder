import React from "react";

const BookCard = ({ book }) => {
  const coverId = book.cover_i;
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/120x160?text=No+Cover";

  return (
    <div className="bg-white shadow-md rounded-xl p-3 hover:shadow-lg transition duration-200">
      <img
        src={imageUrl}
        alt={book.title}
         loading="lazy" 
        className="w-full h-48 object-cover rounded-lg mb-2" // ⬅️ Reduced from h-64 to h-48
      />
      <h3 className="text-base font-semibold text-gray-800">
        {book.title.length > 40 ? `${book.title.slice(0, 40)}...` : book.title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Author: {book.author_name ? book.author_name[0] : "Unknown"}
      </p>
      <p className="text-xs text-gray-500">
        Year: {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
};

export default BookCard;
