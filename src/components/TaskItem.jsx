import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-success text-white' : 'bg-light'}`}
    >
      <span
        className={`me-3 ${task.completed ? 'text-decoration-line-through' : ''}`}
        onClick={() => onToggle(task.id)}
        style={{ cursor: 'pointer' }}
      >
        {task.text}
      </span>
      <div>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => onToggle(task.id)}
        >
          Toggle Complete
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
