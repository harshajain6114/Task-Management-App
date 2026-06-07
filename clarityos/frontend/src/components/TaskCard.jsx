import React, { useState } from 'react';
import { formatDate, isOverdue } from '../utils/helpers';

const TaskCard = ({ task, onUpdate, onDelete, onToggleStatus }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="card-top">
        <div className="card-badges">
          <span className={`badge badge-${task.priority}`}>{task.priority}</span>
          <span className={`badge badge-${task.status}`}>{task.status}</span>
        </div>
        <button className="card-menu-btn">&#8943;</button>
      </div>
      <div className="card-title">{task.title}</div>
      {task.description && <div className="card-desc">{task.description}</div>}
      <div className="card-meta">
        {task.dueDate && (
          <div className={`card-due ${isOverdue(task.dueDate, task.status) ? 'overdue' : ''}`}>
            &#128197; {formatDate(task.dueDate)}{isOverdue(task.dueDate, task.status) ? ' · Overdue' : ''}
          </div>
        )}
      </div>
      <div className="card-divider"></div>
      <div className="card-actions">
        {confirmDelete ? (
          <div className="confirm-delete">
            <span>Delete this task?</span>
            <button className="btn-confirm-yes" onClick={() => onDelete(task._id)}>Yes</button>
            <button className="btn-confirm-no" onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        ) : (
          <>
            <button className="btn-sm btn-toggle" onClick={() => onToggleStatus(task._id)}>Toggle</button>
            <button className="btn-sm btn-edit" onClick={() => onUpdate(task)}>Edit</button>
            <button className="btn-sm btn-delete" onClick={() => setConfirmDelete(true)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;