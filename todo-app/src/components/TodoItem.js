import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = () => {
    if (editText.trim() !== '') {
      onUpdate(todo.id, { ...todo, text: editText });
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff3b30';
      case 'medium':
        return '#ff9500';
      case 'low':
        return '#34c759';
      default:
        return '#666';
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      general: '📋',
      work: '💼',
      personal: '👤',
      shopping: '🛒',
      health: '❤️'
    };
    return emojis[category] || '📋';
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div 
          className="priority-indicator" 
          style={{ backgroundColor: getPriorityColor(todo.priority) }}
          title={todo.priority}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            autoFocus
            className="edit-input"
          />
        ) : (
          <span className="todo-text">{todo.text}</span>
        )}
      </div>

      <div className="todo-meta">
        <span className="category-badge">{getCategoryEmoji(todo.category)}</span>
      </div>

      <div className="todo-actions">
        {!todo.completed && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="action-btn edit-btn"
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="action-btn delete-btn"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;