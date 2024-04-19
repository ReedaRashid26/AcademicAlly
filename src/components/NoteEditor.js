import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // import the editor
import 'react-quill/dist/quill.snow.css'; // import quill styles
import { Button, Paper } from '@mui/material';

function NoteEditor() {
  const [content, setContent] = useState('');

  const saveNote = () => {
    console.log('Saving note content:', content);
    setContent(''); // reset content after save (or handle differently)
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
