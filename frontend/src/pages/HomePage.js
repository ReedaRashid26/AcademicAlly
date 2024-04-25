// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, List, ListItem, ListItemText, Paper, Modal, Box, TextField, Button } from '@mui/material';
import CalendarComponent from '../components/CalendarComponent';
import { useTasks } from '../components/TaskContext';
import TaskDetailModal from '../components/TaskDetailModal';

// Insert the relative path to your logo image
import logoImage from '../images/logo.png'; // Update the import path to your logo image

// Map task types to specific colors
const taskTypeToColor = {
  Assignment: 'blue',
  Quiz: 'green',
  Exam: 'red',
  Project: 'purple',
  Others: 'grey'
};

// Styles for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function HomePage() {
  const { tasks, setTasks } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false); // For modal visibility
  const [currentNote, setCurrentNote] = useState({}); // To hold the current note for the modal

  useEffect(() => {
    // Load the most recent 5 notes from local storage
    const savedNotes = localStorage.getItem('notes');
    const notesData = savedNotes ? JSON.parse(savedNotes) : [];
    setNotes(notesData.slice(-5).reverse());

    // Load tasks from local storage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [setTasks]);

  const handleEventClick = ({ event }) => {
    const task = tasks.find(task => task.name === event.title && task.deadline === event.startStr);
    if (task) {
      setSelectedTask(task);
    }
  };

  const handleClose = () => {
    setSelectedTask(null);
  };

  const handleNoteClick = (note) => {
    setCurrentNote(note);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setCurrentNote({
      ...currentNote,
      [name]: value
    });
  };

  const handleSaveNote = () => {
    const updatedNotes = notes.map(n => n.id === currentNote.id ? currentNote : n);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setOpen(false);
  };

  const calendarEvents = tasks.map(task => ({
    title: task.name,
    start: task.deadline,
    allDay: true,
    color: taskTypeToColor[task.type] || 'black',
    extendedProps: { type: task.type }
  }));

  return (
    <Container maxWidth="lg">
      <Grid container spacing={9} alignItems="flex-start" justifyContent="center" style={{ paddingTop: '130px', paddingBottom: '150px' }}>
        <Grid item xs={12} md={5} style={{ position: 'relative' }}>
          <img src={logoImage} alt="AcademicAlly Logo" style={{ backgroundColor: '#1a1b26', width: '100px', position: 'absolute', top: 80, marginLeft: 150 }} />
          <Typography variant="h4" gutterBottom style={{ marginTop: '150px' }}>Welcome to AcademicAlly</Typography>
          <Typography variant="body1" gutterBottom>
            Your one-stop solution for note-taking, task management, and planning your calendar.
          </Typography>
          <Paper elevation={3} style={{ maxHeight: '400px', overflow: 'auto', marginTop: '50px' }}>
            <List>
              {notes.length > 0 ? notes.map(note => (
                <ListItem key={note.id} button onClick={() => handleNoteClick(note)}>
                  <ListItemText primary={note.title} secondary={note.timestamp} />
                </ListItem>
              )) : (
                <ListItem style={{ justifyContent: 'center' }}>
                  <ListItemText primary="No notes available" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} style={{ position: 'relative' }}>
          <CalendarComponent
            events={calendarEvents}
            eventClick={handleEventClick}
            style={{ marginTop: '100px' }}
          />
          {selectedTask && (
            <TaskDetailModal
              task={selectedTask}
              open={Boolean(selectedTask)}
              onClose={handleClose}
            />
          )}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="edit-note-title"
        aria-describedby="edit-note-content"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-note-title" variant="h6" component="h2">Edit Note</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={currentNote.title || ''}
            onChange={handleNoteChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Content"
            name="content"
            multiline
            rows={4}
            value={currentNote.content || ''}
            onChange={handleNoteChange}
          />
          <Button onClick={handleSaveNote} color="primary" variant="contained" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default HomePage;
