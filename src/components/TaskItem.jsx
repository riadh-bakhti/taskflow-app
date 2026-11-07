import { useState } from 'react';
import TaskForm from './TaskForm';

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

function formatDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function isOverdue(task) {
  if (!task.dueDate || task.isDone) return false;
  const due = new Date(`${task.dueDate}T23:59:59`);
  return due.getTime() < Date.now();
}

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);

  const handleUpdate = (data) => {
    onUpdate(task.id, {
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="task-item task-item--editing">
        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          }}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
          submitLabel="Save changes"
        />
      </li>
    );
  }

  return (
    <li className={`task-item${task.isDone ? ' task-item--done' : ''}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.title}" as done`}
        />
        <span className="checkbox__mark" />
      </label>

      <div className="task-item__body">
        <div className="task-item__top">
          <h3 className="task-item__title">{task.title}</h3>
          <span className={`badge badge--${task.priority}`}>
            {PRIORITY_LABELS[task.priority] || task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-item__description">{task.description}</p>
        )}

        <div className="task-item__meta">
          {task.dueDate && (
            <span className={isOverdue(task) ? 'due due--overdue' : 'due'}>
              {isOverdue(task) ? 'Overdue · ' : 'Due '}
              {formatDate(task.dueDate)}
            </span>
          )}
          <span className="created">
            Created {new Date(task.createdAt).toLocaleDateString('en-GB')}
          </span>
        </div>
      </div>

      <div className="task-item__actions">
        <button
          type="button"
          className="icon-btn"
          onClick={() => setEditing(true)}
          aria-label={`Edit "${task.title}"`}
        >
          Edit
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.title}"`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
