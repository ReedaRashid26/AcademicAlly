package dev.anhtran.academically.repository;

import dev.anhtran.academically.model.Note;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface NoteRepository extends MongoRepository<Note, ObjectId> {
    Optional<Note> findByTitle(String title);
}
