import { useMemo, useState } from 'react';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import Stats from './components/Stats';
import TaskList from './components/TaskList';

const generateId = () => {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

function App() {
  // Tasks are persisted in localStorage (see useLocalStorage / StorageService)
  const [tasks, setTasks] = useLocalStorage('taskflow.tasks', []);
  const [filter, setFilter] = useState('all'); // all | active | completed
  const [query, setQuery] = useState('');

  const addTask = (data) => {
    setTasks((previous) => [
      {
        id: generateId(),
        title: data.title.trim(),
        description: data.description.trim(),
        priority: data.priority,
        dueDate: data.dueDate,
        isDone: false,
        createdAt: new Date().toISOString(),
      },
      ...previous,
    ]);
  };

  const updateTask = (id, data) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks((previous) => previous.filter((task) => !task.isDone));
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.isDone).length;
    const active = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, active, completed, percent };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const search = query.trim().toLowerCase();

    return tasks
      .filter((task) => {
        if (filter === 'active') return !task.isDone;
        if (filter === 'completed') return task.isDone;
        return true;
      })
      .filter((task) => task.title.toLowerCase().includes(search))
      .sort((a, b) => {
        if (a.isDone !== b.isDone) return Number(a.isDone) - Number(b.isDone);
        return (a.dueDate || '9999-12-31').localeCompare(
          b.dueDate || '9999-12-31'
        );
      });
  }, [tasks, filter, query]);

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__content">
          <span className="hero__badge">TaskFlow</span>
          <h1>Organise your day,<br />achieve your goals.</h1>
          <p>
            Create, prioritise and track your tasks. Your data stays in your
            browser — private and always available.
          </p>
        </div>
        <Stats stats={stats} />
      </header>

      <main className="main">
        <section className="panel">
          <h2 className="panel__title">New task</h2>
          <TaskForm onSubmit={addTask} submitLabel="Add task" />
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2 className="panel__title">My tasks</h2>
            <span className="counter">{visibleTasks.length} shown</span>
          </div>

          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            query={query}
            onQueryChange={setQuery}
            stats={stats}
            onClearCompleted={clearCompleted}
          />

          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        </section>
      </main>

      <footer className="footer">
        <p>
          TaskFlow — built with React and localStorage · GOMYCODE Full-stack
          JavaScript project
        </p>
      </footer>
    </div>
  );
}

export default App;
