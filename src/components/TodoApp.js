import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask, sortTasks } from '../redux/tasksSlice';

const TodoApp = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filteredStatus = useSelector((state) => state.tasks.filteredStatus);

  const [taskDetails, setTaskDetails] = useState({ title: '', description: '', status: 'to-do' });
  const [editingId, setEditingId] = useState(null);

  const handleAddTask = () => {
    // Check if title or description is empty or just spaces
    if (!taskDetails.title.trim() || !taskDetails.description.trim()) {
      alert("Please enter both a title and a description!");
      return; // Don't add task if inputs are empty
    }
    
    const newTask = {
      ...taskDetails,
      id: Date.now().toString(),  
    };
    dispatch(addTask(newTask));
    setTaskDetails({ title: '', description: '', status: 'to-do' });
  };

  const handleEditTask = (task) => {
    setEditingId(task.id);
    setTaskDetails({ title: task.title, description: task.description, status: task.status });
  };


  const handleSaveEdit = () => {
     const updatedTask = {
      title: taskDetails.title,
      description: taskDetails.description,
      status: taskDetails.status,
    };
    dispatch(editTask({ id: editingId, updatedTask }));
    setEditingId(null); // Reset editing mode
    setTaskDetails({ title: '', description: '', status: 'to-do' }); // Clear inputs
  };



  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };


  const handleSort = (status) => {
    dispatch(sortTasks(status));
  };
 

  const filteredTasks = filteredStatus
    ? tasks.filter((task) => task.status === filteredStatus)
    : tasks;

  return (
    <div className="todo-app">
      <div className="left">
        <h1>Todo Application</h1>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={taskDetails.title}
            onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            value={taskDetails.description}
            onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
          ></textarea>

          <select
            value={taskDetails.status}
            onChange={(e) => setTaskDetails({ ...taskDetails, status: e.target.value })} >

            <option value="to-do">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
       
          </select>
          <button onClick={editingId ? handleSaveEdit : handleAddTask}>
            {editingId ? 'Save Edit' : 'Add Task'}
          </button>
        </div>
      </div>

      <div className="right">
        <h2>Filter Tasks</h2>
        <div className="filter-buttons">
          <button onClick={() => handleSort('to-do')}>To-Do</button>
          <button onClick={() => handleSort('in-progress')}>In Progress</button>
          <button onClick={() => handleSort('completed')}>Completed</button>
          <button onClick={() => handleSort('')}>All</button>
        </div>

        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <h3>Title: {task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
