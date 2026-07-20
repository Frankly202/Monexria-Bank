import { useState, useEffect } from 'react';

const STORAGE_KEY = 'monexria_todos';

export function useTodoStorage() {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    loadTodosFromStorage();
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveTodosToStorage(todos);
    }
  }, [todos, isLoaded]);

  const loadTodosFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setTodos(Array.isArray(parsed) ? parsed : []);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading todos from storage:', error);
      setIsLoaded(true);
    }
  };

  const saveTodosToStorage = (todos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to storage:', error);
    }
  };

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === id ? updatedTodo : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const clearAll = () => {
    setTodos([]);
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
    clearAll,
    isLoaded
  };
}