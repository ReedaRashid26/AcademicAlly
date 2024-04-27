import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Failed to fetch tasks', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await axios.post('/api/tasks', task);
            setTasks(prevTasks => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };

    const updateTask = async (task) => {
        try {
            const response = await axios.put(`/api/tasks/${task.id}`, task);
            setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? response.data : t));
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
