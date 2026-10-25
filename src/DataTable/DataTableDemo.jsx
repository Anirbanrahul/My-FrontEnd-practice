import React, { useState, useMemo } from 'react';
import InterviewTips from '../components/InterviewTips';

const SAMPLE_USERS = [
  { id: 1, name: 'Alice Smith', role: 'Frontend Engineer', department: 'Engineering', salary: 110000 },
  { id: 2, name: 'Bob Johnson', role: 'Product Manager', department: 'Product', salary: 125000 },
  { id: 3, name: 'Charlie Brown', role: 'UI/UX Designer', department: 'Design', salary: 95000 },
  { id: 4, name: 'Diana Prince', role: 'Backend Developer', department: 'Engineering', salary: 118000 },
  { id: 5, name: 'Evan Wright', role: 'QA Engineer', department: 'Engineering', salary: 88000 },
  { id: 6, name: 'Fiona Gallagher', role: 'Data Analyst', department: 'Analytics', salary: 102000 },
  { id: 7, name: 'George Clark', role: 'DevOps Lead', department: 'Infrastructure', salary: 135000 },
];

// 21. Data Table Component (Sort & Filter)
const DataTableDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedIds, setSelectedIds] = useState([]);

  // Sort & Filter Memoization
  const processedData = useMemo(() => {
    let result = [...SAMPLE_USERS];

    // Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.role.toLowerCase().includes(term) ||
          u.department.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchTerm, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(processedData.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">21. Data Table (Sorting & Filtering)</h2>
      <p className="demo-description">Data table with multi-column sorting (asc/desc), instant global search filter, and row selection checkboxes.</p>

      {/* Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          className="input-field"
          style={{ width: '280px' }}
          placeholder="Filter by name, role, department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Selected: {selectedIds.length} of {processedData.length} rows
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 1rem', width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === processedData.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {['name', 'role', 'department', 'salary'].map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                    textTransform: 'capitalize'
                  }}
                >
                  {col} {sortColumn === col ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.length > 0 ? (
              processedData.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: '1px solid var(--border)',
                      background: isSelected ? 'rgba(99,102,241,0.15)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(row.id)}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold' }}>{row.name}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{row.role}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className="badge">{row.department}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace' }}>
                      ${row.salary.toLocaleString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)' }}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <InterviewTips
        concepts={[
          'useMemo optimization for sorting & filtering dataset',
          'Column sorting comparator logic for numbers and strings',
          'Toggle Select All checkbox logic'
        ]}
        edgeCases={[
          'Handling null or empty values when sorting',
          'Pagination support integration (slice array)'
        ]}
      />
    </div>
  );
};

export default DataTableDemo;
