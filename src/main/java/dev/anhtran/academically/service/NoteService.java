package dev.anhtran.academically.service;

import dev.anhtran.academically.model.Note;
import dev.anhtran.academically.repository.NoteRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Note> findAllNotes() {
        return noteRepository.findAll();
    }

    public Optional<Note> getNoteById(ObjectId id) {
        return noteRepository.findById(id);
    }

    public Optional<Note> getNoteByTitle(String title) {
        return noteRepository.findByTitle(title);
    }

    public Note createNote(String title, String content) {
        return noteRepository.save(new Note(title, content));
    }

    public void updateContent(Note note) {
        noteRepository.save(note);
    }

    public void deleteNote(Note note) {
        noteRepository.delete(note);
    }
}
