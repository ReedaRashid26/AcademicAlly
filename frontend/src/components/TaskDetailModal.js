import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

function TaskDetailModal({ task, open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Task Details</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Name: {task.name}</Typography>
                <Typography variant="subtitle1">Type: {task.type}</Typography>
                <Typography variant="subtitle1">Deadline: {task.deadline}</Typography>
            </DialogContent>
        </Dialog>
    );
}

export default TaskDetailModal;
