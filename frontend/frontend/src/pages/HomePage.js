// src/pages/HomePage.js
import React, { useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CalendarComponent from '../components/CalendarComponent';
import { useTasks } from '../components/TaskContext';
import TaskDetailModal from '../components/TaskDetailModal';

// Map task types to specific colors
const taskTypeToColor = {
  Assignment: 'blue',
  Quiz: 'green',
  Exam: 'red',
  Project: 'purple',
  Others: 'grey'
};

function HomePage() {
    const { tasks } = useTasks();
    const [selectedTask, setSelectedTask] = useState(null);

    const handleEventClick = ({ event }) => {
        // Find the task in the context that matches the clicked event
        const task = tasks.find(task => task.name === event.title && task.deadline === event.startStr);
        if (task) {
            setSelectedTask(task);
        }
    };

    const handleClose = () => {
        setSelectedTask(null);
    };

    // Convert tasks to event objects with a color property based on task type
    const calendarEvents = tasks.map(task => ({
        title: task.name,
        start: task.deadline,
        allDay: true,
        color: taskTypeToColor[task.type] || 'black', // Default color if type not found
        extendedProps: {
            type: task.type
        }
    }));

    return (
        <Container>
            <Grid container spacing={3} alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>Welcome to AcademicAlly</Typography>
                    <Typography variant="body1">
                        Your one-stop solution for note-taking, task management, and planning your calendar.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                    <div style={{ maxWidth: '500px', margin: 'auto' }}>
                        <CalendarComponent
                            events={calendarEvents}
                            eventClick={handleEventClick}
                        />
                        {selectedTask && (
                            <TaskDetailModal
                                task={selectedTask}
                                open={Boolean(selectedTask)}
                                onClose={handleClose}
                            />
                        )}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HomePage;
