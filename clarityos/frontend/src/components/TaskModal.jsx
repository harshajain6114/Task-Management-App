import React, { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{task ? 'Edit Task' : 'New Task'}</span>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Task title" required />
          </div>
          <div className="modal-field">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Optional description" rows="3" />
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="modal-field">
            <label>Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-save">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;