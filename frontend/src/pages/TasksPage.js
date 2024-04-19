// src/pages/TasksPage.js
import React, { useState } from 'react';
import { Button, Container, Grid, Box } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskDetailModal from '../components/TaskDetailModal';

function TasksPage() {
    const [openForm, setOpenForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
    const handleTaskSelect = (task) => setSelectedTask(task);
    const handleCloseModal = () => setSelectedTask(null);

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 2 }}>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleOpenForm}>
                            Create New Task
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {openForm && <TaskForm onClose={handleCloseForm} />}
            <TaskList onSelectTask={handleTaskSelect} />
            {selectedTask && <TaskDetailModal task={selectedTask} open={Boolean(selectedTask)} onClose={handleCloseModal} />}
        </Container>
    );
}

export default TasksPage;
