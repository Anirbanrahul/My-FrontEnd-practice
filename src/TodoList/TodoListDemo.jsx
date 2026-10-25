import React, { useState, useEffect } from 'react';
import InterviewTips from '../components/InterviewTips';

// 20. Todo List Component - Full CRUD
const TodoListDemo = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('interview_todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Master React Machine Coding', completed: false, priority: 'High' },
      { id: 2, text: 'Practice System Design', completed: true, priority: 'Medium' },
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('interview_todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      priority
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setEditingId(null);
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  return (
    <div className="demo-card">
      <h2 className="demo-title">20. Todo List (CRUD)</h2>
      <p className="demo-description">Complete Task Manager supporting Add, Edit, Delete, Completed Toggle, Filter, Priority Tags, and LocalStorage.</p>

      {/* Add Form */}
      <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          className="input-field"
          style={{ flex: 1 }}
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <select
          className="input-field"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="btn">
          Add Task
        </button>
      </form>

      {/* Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['All', 'Active', 'Completed'].map((f) => (
            <button
              key={f}
              className={`btn ${filter === f ? '' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {todos.filter((t) => !t.completed).length} items left
        </span>
      </div>

      {/* Todo List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                opacity: todo.completed ? 0.6 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />

                {editingId === todo.id ? (
                  <input
                    type="text"
                    className="input-field"
                    style={{ flex: 1 }}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                  />
                ) : (
                  <span style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    fontSize: '0.9rem'
                  }}>
                    {todo.text}
                  </span>
                )}

                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: todo.priority === 'High' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                  color: todo.priority === 'High' ? 'var(--danger)' : 'var(--warning)',
                  fontWeight: 'bold'
                }}>
                  {todo.priority}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {editingId === todo.id ? (
                  <button className="btn" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} onClick={() => saveEdit(todo.id)}>
                    Save
                  </button>
                ) : (
                  <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} onClick={() => startEdit(todo)}>
                    ✏️
                  </button>
                )}
                <button className="btn btn-danger" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleDelete(todo.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            No tasks match this filter.
          </div>
        )}
      </div>

      <InterviewTips
        concepts={[
          'CRUD array operations: append [...arr, new], filter, and map update',
          'Inline editing pattern: editingId state tracking',
          'LocalStorage sync via useEffect'
        ]}
        edgeCases={[
          'Preventing empty todo additions',
          'Pressing Enter to save inline edit'
        ]}
      />
    </div>
  );
};

export default TodoListDemo;
