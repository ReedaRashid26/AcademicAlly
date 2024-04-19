// TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        // Initialize tasks from local storage if available
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // Effect to save tasks to local storage when they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask }}>
            {children}
        </TaskContext.Provider>
    );
};

// Export TaskContext directly if needed for advanced use cases
export default TaskContext;
