import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // import the editor
import 'react-quill/dist/quill.snow.css'; // import quill styles
import { Button, Paper } from '@mui/material';
import axios from 'axios';

function NoteEditor({ fetchNotes }) {
  const [content, setContent] = useState('');

  const saveNote = async () => {
      await axios.post('http://localhost:8080/api/notes', {content})
          .then(() => {
              fetchNotes(); // Fetch notes again to refresh the list
              setContent(''); // Clear content after save
          })
          .catch(error => console.error('Failed to save note', error));
  };

  return (
    <Paper style={{ padding: 16, margin: '16px 0' }}>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <Button onClick={saveNote} color="primary" variant="contained" style={{ marginTop: 16 }}>
        Save Note
      </Button>
    </Paper>
  );
}

export default NoteEditor;
