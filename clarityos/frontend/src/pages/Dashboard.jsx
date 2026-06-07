import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const getTimeOfDay = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
};

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const {
    tasks, loading, totalPages, currentPage, totalTasks,
    fetchTasks, createTask, updateTask, deleteTask, toggleStatus,
  } = useTasks();

  const [filters, setFilters] = useState({ status: '', priority: '', search: '', page: 1 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status') || '';
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  }, [location.search]);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  // Wrap all handlers in useCallback to prevent SearchBar re-render loop
  const handleSearch = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const openModal = useCallback((task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(false);
  }, []);

  const handleSaveTask = useCallback(async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
    } else {
      await createTask(taskData);
    }
    closeModal();
  }, [editingTask, updateTask, createTask, closeModal]);

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;

  const skeletons = Array.from({ length: 6 }, (_, i) => (
    <div key={i} className="skeleton-card">
      <div className="skeleton" style={{ height: 12, width: '40%', borderRadius: 6 }}></div>
      <div className="skeleton" style={{ height: 16, width: '75%', borderRadius: 6, marginTop: 8 }}></div>
      <div className="skeleton" style={{ height: 12, width: '55%', borderRadius: 6, marginTop: 6 }}></div>
      <div className="skeleton" style={{ height: 30, borderRadius: 8, marginTop: 16 }}></div>
    </div>
  ));

  return (
    <div className="app-layout">
      <Sidebar totalTasks={totalTasks} completedCount={completedCount} />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-greeting">
            <h1>Good {getTimeOfDay()}, {user?.name?.split(' ')[0]}</h1>
            <p className="topbar-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <button className="btn-add" onClick={() => openModal()}>+ Add Task</button>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-card-label">Total Tasks</div>
            <div className="stat-card-value">{totalTasks}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Completed</div>
            <div className="stat-card-value green">{completedCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">In Progress</div>
            <div className="stat-card-value blue">{inProgressCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Pending</div>
            <div className="stat-card-value amber">{pendingCount}</div>
          </div>
        </div>

        <div className="filter-row">
          <div className="search-wrap">
            <SearchBar onSearch={handleSearch} />
          </div>
          <select className="filter-select" name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="filter-select" name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span className="filter-count">Showing {tasks.length} of {totalTasks}</span>
        </div>

        <div className="task-grid">
          {loading ? skeletons : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">&#128203;</div>
              <h3>No tasks found</h3>
              <p>Create your first task or adjust your filters.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={() => openModal(task)}
                onDelete={deleteTask}
                onToggleStatus={toggleStatus}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => handlePageChange(Number(currentPage) - 1)} disabled={Number(currentPage) <= 1}>&#8249;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} className={`page-btn ${Number(currentPage) === page ? 'active' : ''}`} onClick={() => handlePageChange(page)}>{page}</button>
            ))}
            <button className="page-btn" onClick={() => handlePageChange(Number(currentPage) + 1)} disabled={Number(currentPage) >= totalPages}>&#8250;</button>
          </div>
        )}
      </main>
      <TaskModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveTask} task={editingTask} />
    </div>
  );
};

export default Dashboard;