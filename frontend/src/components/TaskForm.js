// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTasks } from './TaskContext';

function TaskForm({ onClose, editTask }) {
    const [taskName, setTaskName] = useState('');
    const [taskType, setTaskType] = useState('');
    const [deadline, setDeadline] = useState('');
    const { addTask, updateTask } = useTasks();

    useEffect(() => {
        if (editTask) {
            setTaskName(editTask.name);
            setTaskType(editTask.type);
            setDeadline(editTask.deadline.split('T')[0]); // Assuming deadline is stored as ISO string
        }
    }, [editTask]);

    const handleSubmit = () => {
        const taskData = {
            name: taskName,
            type: taskType,
            deadline,
            created: editTask ? editTask.created : new Date().toISOString(),
        };

        if (editTask) {
            updateTask({ ...taskData, id: editTask.id });
        } else {
            addTask({ ...taskData, id: Date.now() });
        }

        onClose();
        setTaskName('');
        setTaskType('');
        setDeadline('');
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{editTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task Name"
                    type="text"
                    fullWidth
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="task-type-label">Task Type</InputLabel>
                    <Select
                        labelId="task-type-label"
                        id="task-type-select"
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                    >
                        <MenuItem value="Assignment">Assignment</MenuItem>
                        <MenuItem value="Quiz">Quiz</MenuItem>
                        <MenuItem value="Exam">Exam</MenuItem>
                        <MenuItem value="Project">Project</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Deadline"
                    type="date"
                    fullWidth
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>{editTask ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskForm;
