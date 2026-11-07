import { useState } from 'react';

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

function TaskForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [form, setForm] = useState(initialValues || EMPTY_FORM);
  const [error, setError] = useState('');

  const update = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError('The title is required.');
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });

    if (!initialValues) {
      setForm(EMPTY_FORM);
    }
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__row">
        <label className="field field--grow">
          <span>Title *</span>
          <input
            type="text"
            value={form.title}
            onChange={update('title')}
            placeholder="e.g. Finish the TaskFlow project"
            maxLength={120}
          />
        </label>

        <label className="field">
          <span>Priority</span>
          <select value={form.priority} onChange={update('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="field">
          <span>Due date</span>
          <input
            type="date"
            value={form.dueDate}
            onChange={update('dueDate')}
          />
        </label>
      </div>

      <label className="field">
        <span>Description</span>
        <textarea
          rows={2}
          value={form.description}
          onChange={update('description')}
          placeholder="Optional details about the task"
          maxLength={500}
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="task-form__actions">
        <button type="submit" className="btn btn--primary">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
