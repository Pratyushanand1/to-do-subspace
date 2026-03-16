import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Check } from 'lucide-react';

/**
 * Single todo item component with checkbox and delete button
 */
export function TodoItem({ todo, onToggle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(todo.id);
    setIsDeleting(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
      data-testid={`todo-item-${todo.id}`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Custom Checkbox */}
        <button
          onClick={() => onToggle(todo.id, todo.is_completed)}
          className={`
            relative w-5 h-5 rounded border-2 transition-all duration-200
            flex items-center justify-center shrink-0
            ${todo.is_completed 
              ? 'bg-indigo-500 border-indigo-500' 
              : 'border-zinc-600 hover:border-indigo-400'
            }
          `}
          aria-label={todo.is_completed ? 'Mark as incomplete' : 'Mark as complete'}
          data-testid={`todo-checkbox-${todo.id}`}
        >
          {todo.is_completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </button>

        {/* Todo Title */}
        <span
          className={`
            text-base truncate transition-all duration-200
            ${todo.is_completed 
              ? 'line-through text-zinc-600' 
              : 'text-zinc-100'
            }
          `}
          data-testid={`todo-title-${todo.id}`}
        >
          {todo.title}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`
          p-2 rounded-md transition-all duration-200
          opacity-0 group-hover:opacity-100
          ${isDeleting 
            ? 'text-zinc-500 cursor-not-allowed' 
            : 'text-zinc-500 hover:text-red-400 hover:bg-red-500/10'
          }
        `}
        aria-label="Delete todo"
        data-testid={`todo-delete-${todo.id}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
