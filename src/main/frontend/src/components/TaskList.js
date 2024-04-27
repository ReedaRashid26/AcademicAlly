import React from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TaskList({ tasks, onSelectTask, onEditTask, fetchTasks }) {
  const deleteTask = async (taskId) => {
    // Ensure taskId is correct by logging or debugging it
    console.log('Deleting task with ID:', taskId);

    // Verify that the taskId is passed correctly
    await axios.delete(`http://localhost:8080/api/tasks/${taskId}`)
        .then(() => {
          fetchTasks();  // Refresh the list of tasks after deletion
        })
        .catch(error => console.error('Failed to delete task', error));
  };

  return (
      <TableContainer component={Paper}>
        <Table aria-label="tasks table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
                <TableRow
                    key={task.id}
                    hover
                    onClick={() => onSelectTask(task)}
                    style={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {task.title}
                  </TableCell>
                  <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(task.created).toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <IconButton
                        aria-label="edit"
                        onClick={(event) => {
                          event.stopPropagation();
                          onEditTask(task);
                        }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteTask(task.id);
                        }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
            {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="subtitle1">No tasks created yet.</Typography>
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default TaskList;
