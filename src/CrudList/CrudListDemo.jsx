import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

const INITIAL_DATA = [
  { id: 1, title: 'Learn React Hooks', category: 'Frontend' },
  { id: 2, title: 'Build Machine Coding Apps', category: 'Frontend' },
  { id: 3, title: 'Master System Design', category: 'Backend' },
];

const CrudListDemo = () => {
  const [items, setItems] = useState(INITIAL_DATA);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Save (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      // Update existing item
      setItems(items.map(item => item.id === editingId ? { ...item, title, category } : item));
      setEditingId(null);
    } else {
      // Create new item
      setItems([...items, { id: Date.now(), title, category }]);
    }

    setTitle('');
  };

  // Start Edit
  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
  };

  // Delete
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Filter items by search
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="demo-card">
      <h2 className="demo-title">CRUD Operations (Simple List)</h2>
      <p className="demo-description">Essential Create, Read, Update, and Delete list pattern for coding interviews.</p>

      {/* Form Input for Create / Update */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>
        <button type="submit" className="btn">
          {editingId ? 'Update' : 'Add Item'}
        </button>
        {editingId && (
          <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); setTitle(''); }}>
            Cancel
          </button>
        )}
      </form>

      {/* Search Filter Box */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '300px' }}
        />
      </div>

      {/* List Table */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '0.6rem 1rem' }}>Title</th>
              <th style={{ padding: '0.6rem 1rem' }}>Category</th>
              <th style={{ padding: '0.6rem 1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No items found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.6rem 1rem' }}>{item.title}</td>
                  <td style={{ padding: '0.6rem 1rem' }}><span className="badge">{item.category}</span></td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <button className="btn btn-secondary" onClick={() => handleEdit(item)} style={{ padding: '0.2rem 0.5rem', marginRight: '0.4rem', fontSize: '0.8rem' }}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <InterviewTips
        concepts={[
          'Create: [...items, newItem]',
          'Update: items.map(item => item.id === targetId ? updatedItem : item)',
          'Delete: items.filter(item => item.id !== targetId)',
          'Search Filter: items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))'
        ]}
      />
    </div>
  );
};

export default CrudListDemo;
