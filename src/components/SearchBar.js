import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search Pokémon..."
    className="w-full p-2 mb-4 border rounded"
  />
);

export default SearchBar;