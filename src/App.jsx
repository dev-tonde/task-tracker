import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import FilterButtons from './components/FilterButtons';
import { DragDropContext } from '@hello-pangea/dnd';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedTheme = localStorage.getItem('theme') || 'light';
    const storedFilter = localStorage.getItem('filter') || 'all';
    setTasks(storedTasks);
    setTheme(storedTheme);
    setFilter(storedFilter);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('theme', theme);
    localStorage.setItem('filter', filter);
  }, [tasks, theme, filter]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      priority,
      isEditing: false,
    };
    setTasks([newEntry, ...tasks]);
    setNewTask('');
    setPriority('medium');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
  );

  return (
    <div className={`container py-4 ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Task Manager</h2>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        priority={priority}
        setPriority={setPriority}
        handleAddTask={handleAddTask}
      />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskList
          tasks={filteredTasks}
          handleToggleComplete={handleToggleComplete}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
      </DragDropContext>
    </div>
  );
}

export default App;