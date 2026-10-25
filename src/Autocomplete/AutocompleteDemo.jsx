import React, { useState, useEffect } from 'react';
import InterviewTips from '../components/InterviewTips';

// Mock dataset for Typeahead / Autocomplete
const MOCK_FRUITS = [
  'Apple', 'Banana', 'Blueberry', 'Blackberry', 'Cherry', 'Cranberry',
  'Dragonfruit', 'Elderberry', 'Fig', 'Grape', 'Guava', 'Kiwi',
  'Lemon', 'Lime', 'Mango', 'Melon', 'Nectarine', 'Orange',
  'Papaya', 'Peach', 'Pear', 'Pineapple', 'Plum', 'Raspberry', 'Strawberry'
];

// 4. Autocomplete Component - Keyboard Nav & Highlight
const AutocompleteDemo = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = MOCK_FRUITS.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
      setSelectedIndex(-1);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelect(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (item) => {
    setQuery(item);
    setIsOpen(false);
  };

  // Highlight query string match inside item
  const renderHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <strong key={index} style={{ color: 'var(--accent)', background: 'rgba(99,102,241,0.2)' }}>
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">4. Autocomplete (Typeahead)</h2>
      <p className="demo-description">Debounced search input with keyboard Arrow/Enter navigation and match highlighting.</p>

      <div style={{ position: 'relative', maxWidth: '350px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            className="input-field"
            style={{ width: '100%' }}
            placeholder="Search fruits (e.g., Apple, Berry)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setIsOpen(true)}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setSuggestions([]); }}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && (
          <ul
            style={{
              position: 'absolute',
              top: '105%',
              left: 0,
              right: 0,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              listStyle: 'none',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 100,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <li
                  key={item}
                  onClick={() => handleSelect(item)}
                  style={{
                    padding: '0.6rem 1rem',
                    cursor: 'pointer',
                    background: selectedIndex === index ? 'var(--bg-hover)' : 'transparent',
                    borderBottom: '1px solid var(--border)',
                    fontSize: '0.9rem'
                  }}
                >
                  {renderHighlightedText(item, query)}
                </li>
              ))
            ) : (
              <li style={{ padding: '0.6rem 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                No results found
              </li>
            )}
          </ul>
        )}
      </div>

      <InterviewTips
        concepts={[
          'Debouncing input search to prevent excessive API calls',
          'Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape) using state index',
          'Substring highlighting using RegExp split()'
        ]}
        edgeCases={[
          'Clearing search input',
          'Handling focus out / clicking outside dropdown (onBlur or click outside listener)',
          'Empty state handling when query returns no items'
        ]}
      />
    </div>
  );
};

export default AutocompleteDemo;
