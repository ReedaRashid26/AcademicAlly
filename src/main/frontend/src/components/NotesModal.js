import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  padding: '16px',
  borderRadius: '8px',
  minWidth: '300px',
}));

function NotesModal({ open, handleClose, note, setNote, fetchNotes }) {
  const handleSave = async () => {
    const apiUrl = note.id ? `http://localhost:8080/api/notes/${note.id}` : 'http://localhost:8080/api/notes';
    const method = note.id ? 'put' : 'post';

    await axios[method](apiUrl, note)
        .then(() => {
          fetchNotes(); // Fetch notes again to refresh the list
          handleClose();
        })
        .catch(error => console.error('Failed to save note', error));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledBox>
        <TextField
          fullWidth
          label="Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Content"
          multiline
          rows={4}
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
          Save Note
        </Button>
      </StyledBox>
    </Modal>
  );
}

export default NotesModal;
