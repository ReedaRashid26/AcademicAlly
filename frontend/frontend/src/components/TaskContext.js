// src/contexts/TaskContext.js
import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

// Custom hook for using context easily outside
export const useTasks = () => useContext(TaskContext);

// Provider component that wraps part of the app needing access to this context
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);  // State to hold tasks

    // Function to add a new task
    const addTask = task => {
        setTasks(currentTasks => [...currentTasks, task]);
    };

    // Providing tasks and addTask to any child components that consume this context
    return (
        <TaskContext.Provider value={{ tasks, addTask }}>
            {children}
        </TaskContext.Provider>
    );
};

// Export TaskContext directly if needed for advanced use cases
export default TaskContext;
