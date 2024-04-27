import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import axios from 'axios';

function TaskDetailModal({ taskId, open, onClose }) {
    const [task, setTask] = React.useState(null);

    React.useEffect(() => {
        // Define the async function inside the useEffect
        async function fetchTask() {
            if (taskId) {
                console.log('Fetching task with ID:', taskId); // Log the taskId
                try {
                    const response = await axios.get(`http://localhost:8080/api/tasks/${taskId}`);
                    console.log('Fetched task:', response.data); // Log the fetched task
                    setTask(response.data);
                } catch (error) {
                    console.error('Failed to fetch task details', error);
                }
            }
        }

        // Call the async function
        fetchTask();
    }, [taskId]);  // Dependencies array

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Task Details</DialogTitle>
            {task ? (
                <DialogContent>
                    <Typography variant="h6">Name: {task.title}</Typography>
                    <Typography variant="subtitle1">Type: {task.type}</Typography>
                    <Typography variant="subtitle1">Deadline: {task.deadline}</Typography>
                </DialogContent>
            ) : (
                <DialogContent>
                    <Typography>Loading...</Typography>
                </DialogContent>
            )}
        </Dialog>
    );
}

export default TaskDetailModal;
