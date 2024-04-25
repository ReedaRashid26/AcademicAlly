// src/components/TaskList.js
import React from 'react';
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
import { useTasks } from './TaskContext';

function TaskList({ tasks, onSelectTask, onEditTask }) {
  const { deleteTask } = useTasks();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="tasks table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length > 0 ? tasks.map((task) => (
            <TableRow 
              key={task.id} 
              hover 
              onClick={() => onSelectTask(task)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row">
                {task.name}
              </TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>{new Date(task.created).toLocaleString()}</TableCell>
              <TableCell align="right">
                <IconButton 
                  aria-label="edit" 
                  onClick={(event) => {
                    event.stopPropagation(); // Prevent the TableRow onClick from triggering
                    onEditTask(task);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  aria-label="delete" 
                  onClick={(event) => {
                    event.stopPropagation(); // Prevent the TableRow onClick from triggering
                    deleteTask(task.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="subtitle1">
                  No tasks created yet.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskList;
