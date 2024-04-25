import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover,
  Typography,
  TextField
} from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskDetailModal from '../components/TaskDetailModal';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import { useTasks } from '../components/TaskContext';

function TasksPage() {
    const [openForm, setOpenForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState({ by: 'name', direction: 'asc' });
    const { tasks, setTasks } = useTasks();

    const handleOpenForm = (task = null) => {
        setSelectedTask(task); // task will be null when creating a new task
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setSelectedTask(null);
        setOpenForm(false);
    };

    const handleTaskSelect = (task) => {
        if (!openForm) {
          setSelectedTask(task);
          // Open task details modal here if needed
        }
    };

    const handleEditTask = (task, event) => {
        setSelectedTask(task);
        setOpenForm(true);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        handleFilterClose();
    };

    const handleSortChange = () => {
        setSort(prevSort => ({
            by: prevSort.by === 'name' ? 'created' : 'name',
            direction: prevSort.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        handleCloseForm();
    };

    const getSortedAndFilteredTasks = () => {
        return tasks
            .filter(task => !filter || task.type === filter)
            .filter(task => !searchQuery || task.name.toLowerCase().includes(searchQuery))
            .sort((a, b) => {
                let fieldA = sort.by === 'name' ? a.name.toLowerCase() : new Date(a.created);
                let fieldB = sort.by === 'name' ? b.name.toLowerCase() : new Date(b.created);
                return sort.direction === 'asc' ? (fieldA < fieldB ? -1 : 1) : (fieldA > fieldB ? -1 : 1);
            });
    };

    const sortedAndFilteredTasks = getSortedAndFilteredTasks();

    const open = Boolean(filterAnchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Container>
            <Box sx={{ mt: 8, mb: 3 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Button
                            startIcon={<FilterListIcon />}
                            onClick={handleFilterClick}
                            sx={{ mr: 1 }}
                            color="primary"
                            variant="contained"
                        >
                            Filter
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={filterAnchorEl}
                            onClose={handleFilterClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                        >
                            <FormControl sx={{ m: 2, minWidth: 120 }}>
                                <InputLabel id="filter-label">Type</InputLabel>
                                <Select
                                    labelId="filter-label"
                                    id="filter-select"
                                    value={filter}
                                    onChange={handleFilterChange}
                                    autoWidth
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="Assignment">Assignment</MenuItem>
                                    <MenuItem value="Quiz">Quiz</MenuItem>
                                    <MenuItem value="Exam">Exam</MenuItem>
                                    <MenuItem value="Project">Project</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Popover>
                        <Button
                            startIcon={<SortIcon />}
                            onClick={handleSortChange}
                            color="primary"
                            variant="contained"
                        >
                            Sort
                        </Button>
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder="Search tasks..."
                            InputProps={{
                                startAdornment: <SearchIcon />,
                            }}
                            onChange={handleSearchChange}
                            sx={{
                                ml: 2,
                                flexGrow: 1
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
                            Create New Task
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {openForm && (
                <TaskForm
                    task={selectedTask}
                    onSave={handleUpdateTask}
                    onClose={handleCloseForm}
                />
            )}
            <TaskList 
              tasks={sortedAndFilteredTasks}
              onSelectTask={handleTaskSelect}
              onEditTask={handleEditTask}
            />
            {selectedTask && !openForm && (
                <TaskDetailModal task={selectedTask} open={Boolean(selectedTask)} onClose={handleCloseModal} />
            )}
        </Container>
    );
}

export default TasksPage;
