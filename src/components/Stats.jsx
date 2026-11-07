function Stats({ stats }) {
  return (
    <div className="stats">
      <div className="stats__progress" aria-hidden="true">
        <div
          className="stats__progress-bar"
          style={{ width: `${stats.percent}%` }}
        />
      </div>

      <div className="stats__grid">
        <div className="stat">
          <strong>{stats.total}</strong>
          <span>Total</span>
        </div>
        <div className="stat">
          <strong>{stats.active}</strong>
          <span>Active</span>
        </div>
        <div className="stat">
          <strong>{stats.completed}</strong>
          <span>Completed</span>
        </div>
        <div className="stat stat--percent">
          <strong>{stats.percent}%</strong>
          <span>Progress</span>
        </div>
      </div>
    </div>
  );
}

export default Stats;
