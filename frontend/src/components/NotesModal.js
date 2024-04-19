// NotesModal.js
import React from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledBox = styled(Box)({
  backgroundColor: 'white',
  padding: '16px',
  borderRadius: '8px',
  minWidth: '300px',
});

export default function NotesModal({ open, handleClose, note, setNote, handleSave }) {
  return (
    <StyledModal open={open} onClose={handleClose}>
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
    </StyledModal>
  );
}
