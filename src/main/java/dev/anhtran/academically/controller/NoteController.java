package dev.anhtran.academically.controller;

import dev.anhtran.academically.model.Note;
import dev.anhtran.academically.service.NoteService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/notes")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getNotes() {
        return new ResponseEntity<List<Note>>(noteService.findAllNotes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Note>> getNoteById(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Note>>(noteService.getNoteById(id), HttpStatus.OK);
    }

//    @GetMapping("/{title}")
//    public ResponseEntity<Optional<Note>> getNoteByTitle(@PathVariable String title) {
//        return new ResponseEntity<Optional<Note>>(noteService.getNoteByTitle(title), HttpStatus.OK);
//    }

    @PostMapping
    public ResponseEntity<String> createNote(@RequestBody Map<String, String> note) {
        noteService.createNote(note.get("title"), note.get("content"));
        return new ResponseEntity<String>("Note created", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateContent(@RequestBody Note note, @PathVariable ObjectId id) {
        Optional<Note> noteOptional = noteService.getNoteById(id);
        if (noteOptional.isPresent()) {
            Note note1 = noteOptional.get();
            note1.setTitle(note.getTitle());
            note1.setContent(note.getContent());
            noteService.updateContent(note1);
            return new ResponseEntity<String>("Note updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Note not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContent(@PathVariable ObjectId id) {
        Optional<Note> noteOptional = noteService.getNoteById(id);
        if (noteOptional.isPresent()) {
            Note note = noteOptional.get();
            noteService.deleteNote(note);
            return new ResponseEntity<String>("Note deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Note not found", HttpStatus.NOT_FOUND);
        }
    }
}
