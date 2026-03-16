import { useState } from 'react';
import { Plus } from 'lucide-react';

/**
 * Form component for adding new todos
 */
export function TodoForm({ onSubmit, disabled }) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubmit(title);
    if (success) {
      setTitle('');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative" data-testid="todo-form">
      <div className="flex items-center gap-3 p-4 border-b border-white/5">
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting || disabled}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${title.trim() && !isSubmitting && !disabled
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }
          `}
          aria-label="Add todo"
          data-testid="add-todo-btn"
        >
          <Plus className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          disabled={disabled || isSubmitting}
          className="
            flex-1 bg-transparent text-lg text-white
            placeholder:text-zinc-600 
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          autoFocus
          data-testid="todo-input"
        />
      </div>
    </form>
  );
}
