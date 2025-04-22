import React from 'react';

function TaskForm({ newTask, setNewTask, priority, setPriority, handleAddTask }) {
  return (
    <div className="mb-3">
      <div className="row g-2">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        <div className="col-12 col-md-3">
          <button className="btn btn-primary w-100" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;