import React, { useState, useMemo } from 'react';

const DIFFICULTIES = ['All', 'Easy', 'Medium'];

const ProblemSelector = ({ problems, activeProblemId, onSelectProblem, completedIds = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Dynamically compute unique categories from problems list
  const categories = useMemo(() => {
    const set = new Set();
    problems.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [problems]);

  // Robust, fully case-insensitive & multi-token search
  const filteredProblems = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();
    const searchTokens = cleanSearch ? cleanSearch.split(/\s+/).filter(Boolean) : [];

    return problems.filter((p) => {
      let matchesSearch = true;

      if (searchTokens.length > 0) {
        // Build a comprehensive searchable text corpus for this problem
        const searchCorpus = [
          p.title || '',
          p.category || '',
          p.difficulty || '',
          p.description || '',
          p.memoryTrick || '',
          p.id || '',
          `#${p.number}`,
          String(p.number || '')
        ].join(' ').toLowerCase();

        // Every token entered by user must be found in the corpus (case-insensitive)
        matchesSearch = searchTokens.every((token) => searchCorpus.includes(token));
      }

      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'All' || p.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [problems, searchTerm, categoryFilter, difficultyFilter]);

  return (
    <div className="dsa-selector-container">
      <div className="dsa-selector-header">
        <h3 className="dsa-selector-title">📚 {problems.length} Practice Suite</h3>
        <span className="dsa-selector-count">
          {completedIds.length}/{problems.length} Practiced
        </span>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          className="dsa-search-input"
          placeholder={`🔍 Search ${problems.length} practice problems (e.g. braces, duplicate, water)...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
              background: 'transparent',
              border: 'none',
              color: '#a0a0b8',
              cursor: 'pointer',
              fontSize: '0.85rem',
              padding: '2px 6px'
            }}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="dsa-filters-row">
        <div className="dsa-filter-group">
          <label>Topic:</label>
          <select
            className="dsa-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="dsa-filter-group">
          <label>Level:</label>
          <select
            className="dsa-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="dsa-problem-list">
        {filteredProblems.map((prob) => {
          const isActive = prob.id === activeProblemId;
          const isDone = completedIds.includes(prob.id);

          return (
            <button
              key={prob.id}
              className={`dsa-problem-card ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
              onClick={() => onSelectProblem(prob.id)}
            >
              <div className="dsa-problem-card-top">
                <span className="dsa-num">#{prob.number}</span>
                <span className="dsa-name">{prob.title}</span>
                {isDone && <span className="dsa-check">✓</span>}
              </div>
              <div className="dsa-problem-card-bottom">
                <span className={`dsa-badge diff-${prob.difficulty.toLowerCase()}`}>
                  {prob.difficulty}
                </span>
                <span className="dsa-badge tag-cat">{prob.category}</span>
              </div>
            </button>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className="dsa-empty-state">No matching problems found. Try another search term or filter.</div>
        )}
      </div>
    </div>
  );
};

export default ProblemSelector;
