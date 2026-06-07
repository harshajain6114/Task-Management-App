import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/helpers';

const Sidebar = ({ totalTasks = 0, completedCount = 0 }) => {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        ClarityOS
        <span className="sidebar-brand-dot"></span>
      </div>
      <div className="sidebar-section-label">Menu</div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          &#9635; All Tasks
        </NavLink>
        <NavLink to="/tasks?status=completed" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          &#10003; Completed
        </NavLink>
        <NavLink to="/tasks?status=pending" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          &#9711; Pending
        </NavLink>
        <NavLink to="/tasks?status=in-progress" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          &#8635; In Progress
        </NavLink>
      </nav>
      <div className="sidebar-stats">
        <div className="sidebar-stat">
          <span>Total</span>
          <span className="sidebar-stat-val">{totalTasks}</span>
        </div>
        <div className="sidebar-stat">
          <span>Done</span>
          <span className="sidebar-stat-val">{completedCount}</span>
        </div>
      </div>
      <div className="sidebar-user">
        <div className="sidebar-avatar">{getInitials(user?.name)}</div>
        <span className="sidebar-username">{user?.name}</span>
        <button className="btn-logout" onClick={logout} title="Logout">&#8618;</button>
      </div>
    </aside>
  );
};

export default Sidebar;