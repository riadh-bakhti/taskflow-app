import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">✓</div>
        <h3>No task to display</h3>
        <p>Add a new task or change the current filter.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TaskList;
