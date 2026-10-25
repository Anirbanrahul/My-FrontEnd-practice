import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

// Dummy Initial Data Tree
const INITIAL_COMMENTS = [
  {
    id: 1,
    text: 'React 19 is amazing! What is your favorite feature?',
    replies: [
      {
        id: 101,
        text: 'Action hooks like useActionState and useFormStatus!',
        replies: [
          { id: 1001, text: 'Agreed, form handling is so much cleaner now!', replies: [] }
        ]
      }
    ]
  },
  {
    id: 2,
    text: 'How do you optimize re-renders in large lists?',
    replies: [
      { id: 201, text: 'Use React Virtualization / Windowing!', replies: [] }
    ]
  }
];

// --- Recursive Comment Item Component ---
const CommentItem = ({ comment, onAddReply, onDeleteComment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(comment.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--border)', marginTop: '0.6rem' }}>
      <div style={{ background: 'var(--bg-primary)', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>{comment.text}</p>
        
        <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
          <button
            onClick={() => setIsReplying(!isReplying)}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
          >
            💬 {isReplying ? 'Cancel' : 'Reply'}
          </button>
          <button
            onClick={() => onDeleteComment(comment.id)}
            style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
          >
            🗑️ Delete
          </button>
        </div>

        {/* Inline Reply Form */}
        {isReplying && (
          <form onSubmit={handleReplySubmit} style={{ marginTop: '0.4rem' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{ width: '100%', padding: '0.3rem 0.5rem', fontSize: '0.8rem' }}
            />
          </form>
        )}
      </div>

      {/* Render Child Replies Recursively */}
      {comment.replies && comment.replies.map((child) => (
        <CommentItem
          key={child.id}
          comment={child}
          onAddReply={onAddReply}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
};

// --- Main Container ---
const NestedCommentsDemo = () => {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');

  // Recursive Helper to Add Reply
  const addReplyRecursive = (list, parentId, text) => {
    return list.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          replies: [...item.replies, { id: Date.now(), text, replies: [] }]
        };
      }
      return {
        ...item,
        replies: addReplyRecursive(item.replies, parentId, text)
      };
    });
  };

  // Recursive Helper to Delete Comment
  const deleteRecursive = (list, targetId) => {
    return list
      .filter((item) => item.id !== targetId)
      .map((item) => ({
        ...item,
        replies: deleteRecursive(item.replies, targetId)
      }));
  };

  const handleAddRoot = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([{ id: Date.now(), text: newComment, replies: [] }, ...comments]);
    setNewComment('');
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">React Nested Comments (1-2 Level)</h2>
      <p className="demo-description">Simple recursive component pattern for nested comment/reply threads in frontend interviews.</p>

      {/* New Root Comment */}
      <form onSubmit={handleAddRoot} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Add a new comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn">Post</button>
      </form>

      {/* Recursive Comment Tree */}
      <div>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onAddReply={(parentId, text) => setComments(prev => addReplyRecursive(prev, parentId, text))}
            onDeleteComment={(id) => setComments(prev => deleteRecursive(prev, id))}
          />
        ))}
      </div>

      <InterviewTips
        concepts={[
          'Recursive Render Pattern: Component calls itself to render child items (CommentItem rendering CommentItem)',
          'Immutable Recursive Tree Updates: Using map & filter recursively to update deeply nested items without mutating state',
          'Data structure: Array of objects with replies: [] array'
        ]}
      />
    </div>
  );
};

export default NestedCommentsDemo;
