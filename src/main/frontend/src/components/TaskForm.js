import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function TaskForm({ task, open, onClose, refreshTasks }) {
  const [taskName, setTaskName] = useState('');
  const [taskType, setTaskType] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (task) {
      setTaskName(task.title);
      setTaskType(task.type);
      setDeadline(task.deadline);
    }
  }, [task]);

  const handleSubmit = async () => {
    const taskData = {
      title: taskName,
      type: taskType,
      deadline: new Date(deadline),
      created: new Date() // Add this line
    };

    const apiUrl = task ? `http://localhost:8080/api/tasks/${task.id}` : 'http://localhost:8080/api/tasks';
    const method = task ? 'put' : 'post';

    await axios[method](apiUrl, taskData)
        .then(() => {
          onClose();
          refreshTasks();
        })
        .catch(error => console.error('Failed to save task', error));

    setTaskName('');
    setTaskType('');
    setDeadline('');
  };

  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task Title"
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
                onChange={e => setTaskType(e.target.value)}
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
              onChange={e => setDeadline(e.target.value)}
              InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{task ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
  );
}

export default TaskForm;
