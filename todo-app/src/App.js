import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import { useTodoStorage } from './hooks/useTodoStorage';

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo, clearCompleted } = useTodoStorage();
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 My Todo List</h1>
        <p>Stay organized and productive</p>
      </header>

      <main className="app-main">
        <TodoForm onAddTodo={addTodo} />

        <TodoStats 
          total={todos.length}
          completed={todos.filter(t => t.completed).length}
          active={todos.filter(t => !t.completed).length}
        />

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({todos.filter(t => !t.completed).length})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({todos.filter(t => t.completed).length})
          </button>
        </div>

        {filteredTodos.length > 0 ? (
          <TodoList 
            todos={filteredTodos}
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleTodo}
            onUpdateTodo={updateTodo}
          />
        ) : (
          <div className="empty-state">
            <p>🎉 {filter === 'all' ? 'No todos yet. Create one to get started!' : `No ${filter} todos.`}</p>
          </div>
        )}

        {todos.some(t => t.completed) && (
          <div className="clear-completed">
            <button onClick={clearCompleted} className="clear-btn">
              Clear Completed Tasks
            </button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 Monexria Todo App • Keep track of your daily tasks</p>
      </footer>
    </div>
  );
}

export default App;