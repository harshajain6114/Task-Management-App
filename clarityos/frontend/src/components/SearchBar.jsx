import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Use a ref to avoid onSearch being a dependency (prevents polling loop)
  const onSearchRef = useRef(onSearch);
  useEffect(() => { onSearchRef.current = onSearch; });

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchRef.current(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div className="search-input-wrap">
      <span className="search-icon">&#128269;</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button className="search-clear" onClick={() => setSearchTerm('')}>&times;</button>
      )}
    </div>
  );
};

export default SearchBar;