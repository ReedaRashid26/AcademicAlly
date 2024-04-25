import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        // Retrieve tasks from local storage or initialize to an empty array
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // Update local storage whenever the tasks array changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        const updatedTasks = [...tasks, { ...newTask, id: Date.now(), created: new Date().toISOString() }];
        setTasks(updatedTasks);
    };

    const updateTask = (updatedTask) => {
        const updatedTasks = tasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
