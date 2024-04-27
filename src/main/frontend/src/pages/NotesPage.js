// NotesPage.js
import React, {useState, useEffect} from 'react';
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
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import NotesModal from '../components/NotesModal';

export default function NotesPage() {
    const [currentNote, setCurrentNote] = useState({title: '', content: ''});
    const [modalOpen, setModalOpen] = useState(false);

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/notes');
            const sortedNotes = response.data.sort((a, b) => new Date(b.created) - new Date(a.created));
            setNotes(sortedNotes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleOpen = (note = {id: null, title: '', content: ''}) => {
        setCurrentNote(note);
        setModalOpen(true);
    };

    const handleSave = () => {
        const updatedNotes = currentNote.id
            ? notes.map(note => (note.id === currentNote.id ? currentNote : note))
            : [...notes, {...currentNote, id: Date.now()}];
        setNotes(updatedNotes);
        setModalOpen(false);
    };

    const handleDelete = async (noteId) => {
        try {
            await axios.delete(`http://localhost:8080/api/notes/${noteId}`);
            const updatedNotes = notes.filter(note => note.id !== noteId);
            setNotes(updatedNotes);
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <Paper sx={{marginTop: 10, marginRight: 50, marginLeft: 50}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notes.map((note, index) => (
                            <TableRow key={note.id || index} hover>
                                <TableCell component="th" scope="row">{note.title}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => handleOpen(note)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(note.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => handleOpen()}
                sx={{margin: 2}}
            >
                New Note
            </Button>
            <NotesModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                note={currentNote}
                setNote={setCurrentNote}
                handleSave={handleSave}
                fetchNotes={fetchNotes}
            />
        </Paper>
    );
}
