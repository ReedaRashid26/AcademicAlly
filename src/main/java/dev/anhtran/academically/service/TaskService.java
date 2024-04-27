package dev.anhtran.academically.service;

import dev.anhtran.academically.model.Task;
import dev.anhtran.academically.repository.TaskRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(ObjectId id) {
        return taskRepository.findById(id);
    }

    public Optional<Task> getTaskByTitle(String title) {
        return taskRepository.findByTitle(title);
    }

    public void createTask(String title, String type, Date deadline, Date created) {
        Task task = new Task(title, type, deadline, created);
        task = taskRepository.save(task);
        task.setTaskId(task.getId().toHexString());
    }

    public void updateTask(Task task) {
        taskRepository.save(task);
    }

    public void deleteTask(Task task) {
        taskRepository.delete(task);
    }
}
