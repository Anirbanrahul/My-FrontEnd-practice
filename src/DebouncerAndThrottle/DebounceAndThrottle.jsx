// SearchComponent.js
import { useState, useEffect, useCallback } from 'react';

function DebounceAndThrottle({ onDebouncedSearch, onThrottledSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onThrottledSearch(newSearchTerm); // Call throttled search on every input change
  };

  useEffect(() => {
    if (searchTerm) {
      const timerId = setTimeout(() => {
        onDebouncedSearch(searchTerm);
      }, 300); // Wait for 300ms of inactivity

      return () => clearTimeout(timerId); // Cleanup the timer
    }
  }, [searchTerm, onDebouncedSearch]);

  return (
    <div>
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default DebounceAndThrottle;