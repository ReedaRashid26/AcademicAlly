// src/components/TaskList.js
import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTasks } from '../components/TaskContext';

function TaskList({ onSelectTask }) {
    const { tasks } = useTasks();

    if (tasks.length === 0) {
        return (
            <Typography variant="subtitle1" style={{ marginTop: '40px' }}>
                No tasks created yet.
            </Typography>
        );
    }

    return (
        <List>
            {tasks.map((task, index) => (
                <ListItem key={index} button onClick={() => onSelectTask(task)}>
                    <ListItemText primary={task.name} secondary={`Due: ${task.deadline}`} />
                </ListItem>
            ))}
        </List>
    );
}

export default TaskList;
