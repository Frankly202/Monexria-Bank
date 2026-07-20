import React from 'react';
import './TodoStats.css';

function TodoStats({ total, completed, active }) {
  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-number total">{total}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      <div className="stat-card">
        <div className="stat-number active">{active}</div>
        <div className="stat-label">Active</div>
      </div>
      <div className="stat-card">
        <div className="stat-number completed">{completed}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card">
        <div className="stat-number percentage">{completionPercentage}%</div>
        <div className="stat-label">Progress</div>
      </div>
    </div>
  );
}

export default TodoStats;