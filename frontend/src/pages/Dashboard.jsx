import { useEffect, useState } from 'react';
import { useSignOut, useUserData } from '@nhost/react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, CheckSquare, AlertCircle, ListTodo, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { TodoItem } from '../components/TodoItem';
import { TodoForm } from '../components/TodoForm';
import { useTodos } from '../hooks/useTodos';

/**
 * Main dashboard page displaying todo list with CRUD operations
 */
export function Dashboard() {
  const user = useUserData();
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const { todos, loading, error, fetchTodos, createTodo, toggleTodo, deleteTodo, clearError } = useTodos();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  const handleAddTodo = async (title) => {
    const result = await createTodo(title);
    return !!result;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTodos();
    setIsRefreshing(false);
  };

  // Count stats
  const completedCount = todos.filter(t => t.is_completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: '#050505' }}
      data-testid="dashboard-page"
    >
      {/* Header */}
      <header 
        className="sticky top-0 z-10 backdrop-blur-md border-b"
        style={{ 
          backgroundColor: 'rgba(5, 5, 5, 0.8)', 
          borderColor: 'rgba(255, 255, 255, 0.05)' 
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <CheckSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Todo App
              </h1>
              {user?.email && (
                <p className="text-xs text-zinc-500 truncate max-w-[150px]" data-testid="user-email">
                  {user.email}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className="text-zinc-400 hover:text-white hover:bg-white/5"
              data-testid="refresh-btn"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-zinc-400 hover:text-white hover:bg-white/5"
              data-testid="signout-btn"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-zinc-400 text-sm">
              <span className="text-white font-medium">{pendingCount}</span> pending
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-400 text-sm">
              <span className="text-white font-medium">{completedCount}</span> completed
            </span>
          </div>
        </div>

        {/* Todo Card */}
        <div 
          className="rounded-xl border overflow-hidden"
          style={{ 
            backgroundColor: '#0A0A0A', 
            borderColor: 'rgba(255, 255, 255, 0.05)' 
          }}
        >
          {/* Add Todo Form */}
          <TodoForm onSubmit={handleAddTodo} disabled={loading} />

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mx-4 mb-2"
              >
                <div 
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
                  data-testid="error-message"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-red-400 text-sm flex-1">{error}</p>
                  <button 
                    onClick={clearError}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {loading && todos.length === 0 && (
            <div className="p-8" data-testid="loading-skeleton">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 border-b border-white/5">
                  <div className="w-5 h-5 rounded bg-white/5 animate-pulse" />
                  <div className="flex-1 h-4 rounded bg-white/5 animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {/* Todo List */}
          {!loading && todos.length === 0 ? (
            <div className="p-12 text-center" data-testid="empty-state">
              <ListTodo className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm">No todos yet. Add one above!</p>
            </div>
          ) : (
            <div data-testid="todo-list">
              <AnimatePresence mode="popLayout">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <p className="text-center text-zinc-600 text-xs mt-8">
          Powered by Nhost GraphQL
        </p>
      </main>
    </div>
  );
}
