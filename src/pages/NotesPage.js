// NotesPage.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import NotesModal from '../components/NotesModal';

export default function NotesPage() {
  const [notes, setNotes] = useState(() => {
    // Load notes from local storage on initial load
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Save notes to local storage when they change
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleOpen = (note = { id: null, title: '', content: '' }) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const handleSave = () => {
    const updatedNotes = currentNote.id
      ? notes.map(note => (note.id === currentNote.id ? currentNote : note))
      : [...notes, { ...currentNote, id: Date.now() }];
    setNotes(updatedNotes);
    setModalOpen(false);
  };

  const handleDelete = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <Paper sx={{ margin: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id} hover>
                <TableCell component="th" scope="row">{note.title}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" onClick={() => handleOpen(note)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(note.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpen()}
        sx={{ margin: 2 }}
      >
        New Note
      </Button>
      <NotesModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        note={currentNote}
        setNote={setCurrentNote}
        handleSave={handleSave}
      />
    </Paper>
  );
}
