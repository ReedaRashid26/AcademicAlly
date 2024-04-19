// TasksPage.js
import React, { useState } from 'react';
import { Button, Container, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskDetailModal from '../components/TaskDetailModal';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTasks } from '../components/TaskContext';

function TasksPage() {
    const [openForm, setOpenForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const { tasks, setTasks } = useTasks(); // Ensure this is being correctly provided by the context

    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
    const handleTaskSelect = (task) => setSelectedTask(task);
    const handleCloseModal = () => setSelectedTask(null);
    const handleFilterChange = (event) => setFilter(event.target.value);

    const filteredTasks = tasks.filter((task) => {
        return filter ? task.type === filter : true;
    });

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 2 }}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Button
                            startIcon={<FilterListIcon />}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            Filter
                        </Button>
                        {showFilters && (
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="filter-label">Type</InputLabel>
                                <Select
                                    labelId="filter-label"
                                    id="filter-select"
                                    value={filter}
                                    label="Type"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="Assignment">Assignment</MenuItem>
                                    <MenuItem value="Quiz">Quiz</MenuItem>
                                    <MenuItem value="Exam">Exam</MenuItem>
                                    <MenuItem value="Project">Project</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleOpenForm}>
                            Create New Task
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {openForm && <TaskForm onClose={handleCloseForm} />}
            <TaskList onSelectTask={handleTaskSelect} tasks={filteredTasks} />
            {selectedTask && <TaskDetailModal task={selectedTask} open={Boolean(selectedTask)} onClose={handleCloseModal} />}
        </Container>
    );
}

export default TasksPage;
