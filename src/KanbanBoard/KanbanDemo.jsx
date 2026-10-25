import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

const INITIAL_COLUMNS = [
  { id: 'todo', title: '📋 To Do', badgeColor: 'var(--accent)' },
  { id: 'in_progress', title: '⚡ In Progress', badgeColor: 'var(--warning)' },
  { id: 'done', title: '✅ Done', badgeColor: 'var(--success)' },
];

const INITIAL_TASKS = [
  { id: 1, title: 'Implement Auth Flow', column: 'todo', tag: 'Backend' },
  { id: 2, title: 'Build Kanban Drag-Drop', column: 'in_progress', tag: 'Frontend' },
  { id: 3, title: 'Setup Vite React App', column: 'done', tag: 'Setup' },
];

// 23. Kanban Board Component
const KanbanDemo = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [targetColumn, setTargetColumn] = useState('todo');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      column: targetColumn,
      tag: 'Feature'
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const moveTask = (taskId, direction) => {
    const colOrder = ['todo', 'in_progress', 'done'];
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const currentIndex = colOrder.indexOf(task.column);
          const nextIndex = currentIndex + direction;
          if (nextIndex >= 0 && nextIndex < colOrder.length) {
            return { ...task, column: colOrder[nextIndex] };
          }
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">23. Kanban Task Board</h2>
      <p className="demo-description">Multi-column workflow board to create, move (Left/Right), and manage tasks across status columns.</p>

      {/* Add Task Control */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="input-field"
          style={{ flex: 1 }}
          placeholder="New Task description..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <select
          className="input-field"
          value={targetColumn}
          onChange={(e) => setTargetColumn(e.target.value)}
        >
          {INITIAL_COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>{col.title}</option>
          ))}
        </select>
        <button type="submit" className="btn">
          + Add Card
        </button>
      </form>

      {/* Columns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {INITIAL_COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);

          return (
            <div
              key={col.id}
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '260px'
              }}
            >
              {/* Column Title Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem' }}>{col.title}</h4>
                <span className="badge" style={{ background: col.badgeColor, color: 'white' }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{task.title}</span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}>
                        {task.tag}
                      </span>

                      {/* Direction Shift Controls */}
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '0.1rem 0.4rem', fontSize: '0.75rem' }}
                          disabled={task.column === 'todo'}
                          onClick={() => moveTask(task.id, -1)}
                        >
                          ◀
                        </button>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '0.1rem 0.4rem', fontSize: '0.75rem' }}
                          disabled={task.column === 'done'}
                          onClick={() => moveTask(task.id, 1)}
                        >
                          ▶
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <InterviewTips
        concepts={[
          'Task state array with column property mapping to column ID',
          'Moving cards across columns using index shift: colOrder.indexOf(col) + dir',
          'HTML5 Drag and Drop API alternative (onDragStart, onDragOver, onDrop)'
        ]}
        edgeCases={[
          'Preventing moving out of bounds (disabled buttons on first/last columns)',
          'Persisting task card re-ordering within the same column'
        ]}
      />
    </div>
  );
};

export default KanbanDemo;
