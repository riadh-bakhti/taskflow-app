const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

function FilterBar({
  filter,
  onFilterChange,
  query,
  onQueryChange,
  stats,
  onClearCompleted,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__tabs" role="group" aria-label="Filter tasks">
        {FILTERS.map((item) => {
          const count =
            item.key === 'all'
              ? stats.total
              : item.key === 'active'
              ? stats.active
              : stats.completed;

          return (
            <button
              key={item.key}
              type="button"
              className={
                filter === item.key ? 'tab tab--active' : 'tab'
              }
              onClick={() => onFilterChange(item.key)}
            >
              {item.label}
              <span className="tab__count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="filter-bar__tools">
        <input
          type="search"
          className="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search a task..."
          aria-label="Search tasks by title"
        />
        {stats.completed > 0 && (
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
