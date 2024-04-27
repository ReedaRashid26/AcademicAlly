package dev.anhtran.academically.repository;

import dev.anhtran.academically.model.Task;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TaskRepository extends MongoRepository<Task, ObjectId> {
    Optional<Task> findByTitle(String title);
}
