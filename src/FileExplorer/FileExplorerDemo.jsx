import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

// Initial Mock File System Tree Structure
const INITIAL_FILES = {
  id: 'root',
  name: 'src',
  isFolder: true,
  children: [
    {
      id: '1',
      name: 'components',
      isFolder: true,
      children: [
        { id: '1-1', name: 'Header.jsx', isFolder: false },
        { id: '1-2', name: 'Sidebar.jsx', isFolder: false },
      ],
    },
    {
      id: '2',
      name: 'styles',
      isFolder: true,
      children: [{ id: '2-1', name: 'index.css', isFolder: false }],
    },
    { id: '3', name: 'App.jsx', isFolder: false },
    { id: '4', name: 'package.json', isFolder: false },
  ],
};

// Recursive File System Item Component
const FileNode = ({ item, onAdd, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(null); // 'file' or 'folder'
  const [newItemName, setNewItemName] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onAdd(item.id, newItemName.trim(), isAdding === 'folder');
    setNewItemName('');
    setIsAdding(null);
    setIsOpen(true);
  };

  return (
    <div style={{ marginLeft: '16px', marginTop: '0.35rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.35rem 0.6rem',
        borderRadius: '6px',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        fontSize: '0.875rem'
      }}>
        {/* Item Label */}
        <div
          onClick={() => item.isFolder && setIsOpen(!isOpen)}
          style={{ cursor: item.isFolder ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1 }}
        >
          <span>{item.isFolder ? (isOpen ? '📂' : '📁') : '📄'}</span>
          <span style={{ fontWeight: item.isFolder ? 'bold' : 'normal' }}>{item.name}</span>
        </div>

        {/* Node Actions */}
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {item.isFolder && (
            <>
              <button
                className="btn btn-secondary"
                style={{ padding: '0.15rem 0.4rem', fontSize: '0.75rem' }}
                onClick={() => { setIsAdding('file'); setIsOpen(true); }}
              >
                + File
              </button>
              <button
                className="btn btn-secondary"
                style={{ padding: '0.15rem 0.4rem', fontSize: '0.75rem' }}
                onClick={() => { setIsAdding('folder'); setIsOpen(true); }}
              >
                + Folder
              </button>
            </>
          )}
          {item.id !== 'root' && (
            <button
              className="btn btn-danger"
              style={{ padding: '0.15rem 0.4rem', fontSize: '0.75rem' }}
              onClick={() => onDelete(item.id)}
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Input box to add new item */}
      {isAdding && (
        <form onSubmit={handleCreate} style={{ marginLeft: '16px', marginTop: '0.35rem', display: 'flex', gap: '0.4rem' }}>
          <span>{isAdding === 'folder' ? '📁' : '📄'}</span>
          <input
            type="text"
            className="input-field"
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
            placeholder={`Enter ${isAdding} name...`}
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
            Add
          </button>
          <button type="button" className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} onClick={() => setIsAdding(null)}>
            Cancel
          </button>
        </form>
      )}

      {/* Render Folder Children Recursively */}
      {isOpen && item.isFolder && item.children && (
        <div>
          {item.children.map((child) => (
            <FileNode key={child.id} item={child} onAdd={onAdd} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

// 22. File Explorer Component
const FileExplorerDemo = () => {
  const [fileTree, setFileTree] = useState(INITIAL_FILES);

  // Recursively add new item to target parent ID
  const addItemToTree = (tree, targetId, name, isFolder) => {
    if (tree.id === targetId) {
      return {
        ...tree,
        children: [
          ...tree.children,
          {
            id: Date.now().toString(),
            name,
            isFolder,
            children: isFolder ? [] : undefined,
          },
        ],
      };
    }

    if (tree.children) {
      return {
        ...tree,
        children: tree.children.map((child) => addItemToTree(child, targetId, name, isFolder)),
      };
    }

    return tree;
  };

  // Recursively delete item by ID
  const deleteItemFromTree = (tree, targetId) => {
    if (tree.children) {
      return {
        ...tree,
        children: tree.children
          .filter((child) => child.id !== targetId)
          .map((child) => deleteItemFromTree(child, targetId)),
      };
    }
    return tree;
  };

  const handleAdd = (parentId, name, isFolder) => {
    setFileTree((prevTree) => addItemToTree(prevTree, parentId, name, isFolder));
  };

  const handleDelete = (id) => {
    setFileTree((prevTree) => deleteItemFromTree(prevTree, id));
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">22. File Explorer (Tree Structure)</h2>
      <p className="demo-description">Recursive file explorer tree rendering, adding files/folders at any depth level, and deleting nodes.</p>

      <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '500px' }}>
        <FileNode item={fileTree} onAdd={handleAdd} onDelete={handleDelete} />
      </div>

      <InterviewTips
        concepts={[
          'Recursive Component rendering: FileNode calling itself for child nodes',
          'Recursive immutable state update logic to insert or delete nested tree nodes',
          'isFolder boolean flag checking'
        ]}
        edgeCases={[
          'Preventing deleting the root directory node',
          'Handling duplicate file names in same folder'
        ]}
      />
    </div>
  );
};

export default FileExplorerDemo;
