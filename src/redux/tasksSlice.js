import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filteredStatus: '', // For sorting tasks by status
};


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      addTask: (state, action) => {
        state.tasks.push(action.payload);
      },


      deleteTask: (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      },


      editTask: (state, action) => {
        const { id, updatedTask } = action.payload;
        const index = state.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...updatedTask };
        }
      },
      
      sortTasks: (state, action) => {
        state.filteredStatus = action.payload;
      },
    },
  });
  
  export const { addTask, deleteTask, editTask, sortTasks } = tasksSlice.actions;
  
  export default tasksSlice.reducer;