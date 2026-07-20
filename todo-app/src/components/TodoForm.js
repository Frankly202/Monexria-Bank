import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TodoForm.css';

function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newTodo = {
      id: uuidv4(),
      text: input,
      completed: false,
      priority,
      category,
      createdAt: new Date().toISOString(),
      dueDate: null
    };

    onAddTodo(newTodo);
    setInput('');
    setPriority('medium');
    setCategory('general');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">➕ Add</button>
      </div>
      
      <div className="form-options">
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="general">📋 General</option>
          <option value="work">💼 Work</option>
          <option value="personal">👤 Personal</option>
          <option value="shopping">🛒 Shopping</option>
          <option value="health">❤️ Health</option>
        </select>
      </div>
    </form>
  );
}

export default TodoForm;