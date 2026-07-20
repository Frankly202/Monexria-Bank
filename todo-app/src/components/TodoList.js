import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onDeleteTodo, onToggleTodo, onUpdateTodo }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDeleteTodo}
          onToggle={onToggleTodo}
          onUpdate={onUpdateTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;