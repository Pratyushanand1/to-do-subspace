import { useState, useCallback } from 'react';
import { useNhostClient } from '@nhost/react';
import { GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '../lib/graphql';

/**
 * Custom hook for managing todo operations via Nhost GraphQL API
 */
export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nhost = useNhostClient();

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: gqlError } = await nhost.graphql.request(GET_TODOS);

      if (gqlError) {
        setError(gqlError.message || 'Failed to fetch todos');
        return;
      }

      setTodos(data?.todos || []);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [nhost]);

  // Create a new todo
  const createTodo = useCallback(async (title) => {
    if (!title.trim()) return null;

    setError(null);
    try {
      const { data, error: gqlError } = await nhost.graphql.request(CREATE_TODO, {
        title: title.trim(),
      });

      if (gqlError) {
        setError(gqlError.message || 'Failed to create todo');
        return null;
      }

      const newTodo = data?.insert_todos_one;
      if (newTodo) {
        setTodos((prev) => [newTodo, ...prev]);
      }
      return newTodo;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      return null;
    }
  }, [nhost]);

  // Toggle todo completion
  const toggleTodo = useCallback(async (id, currentStatus) => {
    setError(null);
    
    // Optimistic update
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, is_completed: !currentStatus } : todo
      )
    );

    try {
      const { data, error: gqlError } = await nhost.graphql.request(UPDATE_TODO, {
        id,
        is_completed: !currentStatus,
      });

      if (gqlError) {
        // Revert optimistic update
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, is_completed: currentStatus } : todo
          )
        );
        setError(gqlError.message || 'Failed to update todo');
        return null;
      }

      return data?.update_todos_by_pk;
    } catch (err) {
      // Revert optimistic update
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_completed: currentStatus } : todo
        )
      );
      setError(err.message || 'An unexpected error occurred');
      return null;
    }
  }, [nhost]);

  // Delete a todo
  const deleteTodo = useCallback(async (id) => {
    setError(null);
    
    // Optimistic delete
    const previousTodos = todos;
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    try {
      const { error: gqlError } = await nhost.graphql.request(DELETE_TODO, { id });

      if (gqlError) {
        // Revert optimistic delete
        setTodos(previousTodos);
        setError(gqlError.message || 'Failed to delete todo');
        return false;
      }

      return true;
    } catch (err) {
      // Revert optimistic delete
      setTodos(previousTodos);
      setError(err.message || 'An unexpected error occurred');
      return false;
    }
  }, [nhost, todos]);

  // Clear error
  const clearError = useCallback(() => setError(null), []);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
    clearError,
  };
}
