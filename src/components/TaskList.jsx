import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

function TaskList({ tasks, handleToggleComplete, handleDeleteTask, handleEditTask }) {
  const getBadgeColor = (priority) => {
    if (priority === 'high') return 'bg-danger';
    if (priority === 'medium') return 'bg-warning text-dark';
    return 'bg-success';
  };

  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <ul className="list-group" {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided) => (
                <li
                  className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className="flex-grow-1 mb-2 mb-md-0 text-section">
                    {task.isEditing ? (
                      <input
                        className="form-control mb-2"
                        value={task.text}
                        onChange={(e) => handleEditTask(task.id, e.target.value)}
                        onBlur={() => handleEditTask(task.id, task.text)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditTask(task.id, e.target.value);
                        }}
                      />
                    ) : (
                      <span
                        onClick={() => handleEditTask(task.id, task.text)}
                        style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                        className="d-block text-wrap"
                      >
                        {task.text}
                      </span>
                    )}
                    <span className={`badge ${getBadgeColor(task.priority)}`}>{task.priority} priority</span>
                  </div>
                  <div className="d-flex flex-column flex-md-row gap-2 button-section">
                    <button
                      className={`btn btn-sm ${task.completed ? 'btn-success' : 'btn-outline-success'}`}
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.completed ? 'Completed' : 'Mark Complete'}
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default TaskList;
