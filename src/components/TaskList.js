// src/components/TaskList.js
import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function TaskList({ tasks, onSelectTask }) {
    // Check if the tasks array is empty and return a message if true
    if (tasks.length === 0) {
        return (
            <Typography variant="subtitle1" style={{ marginTop: '40px', textAlign: 'center' }}>
                No tasks created yet.
            </Typography>
        );
    }

    return (
        <List>
            {tasks.map((task) => (
                <ListItem key={task.id} button onClick={() => onSelectTask(task)}>
                    <ListItemText primary={task.name} secondary={`Due: ${task.deadline}`} />
                </ListItem>
            ))}
        </List>
    );
}

export default TaskList;
