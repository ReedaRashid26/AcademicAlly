// src/components/TaskForm.js
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTasks } from '../components/TaskContext';  // Ensure correct import

function TaskForm({ onClose }) {
    const [taskName, setTaskName] = useState('');
    const [taskType, setTaskType] = useState('');
    const [deadline, setDeadline] = useState('');
    const { addTask } = useTasks();  // Destructure addTask correctly from the context

    const handleSubmit = () => {
        if (taskName && taskType && deadline) {
            addTask({ name: taskName, type: taskType, deadline });
            onClose();
            setTaskName('');
            setTaskType('');
            setDeadline('');
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Add New Task</DialogTitle>
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
                <Button onClick={handleSubmit}>Add Task</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskForm;
