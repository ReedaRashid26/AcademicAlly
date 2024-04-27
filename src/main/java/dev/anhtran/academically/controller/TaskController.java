package dev.anhtran.academically.controller;

import dev.anhtran.academically.model.Note;
import dev.anhtran.academically.model.Task;
import dev.anhtran.academically.service.TaskService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = taskService.findAllTasks();
        tasks.forEach(task -> task.setId(task.getId())); // Convert ObjectId to string
        return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getTaskById(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Task>>(taskService.getTaskById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createTask(@RequestBody Task task) {
        taskService.createTask(task.getTitle(), task.getType(), task.getDeadline(), task.getCreated());
        return new ResponseEntity<String>("Task created", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTask(@RequestBody Task task, @PathVariable ObjectId id) {
        Optional<Task> taskOptional = taskService.getTaskById(id);
        if (taskOptional.isPresent()) {
            Task task1 = taskOptional.get();
            task1.setTitle(task.getTitle());
            task1.setType(task.getType());
            task1.setDeadline(task.getDeadline());
            task1.setCreated(task.getCreated());
            taskService.updateTask(task1);
            return new ResponseEntity<String>("Task updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Task not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable ObjectId id) {
        Optional<Task> taskOptional = taskService.getTaskById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            taskService.deleteTask(task);
            return new ResponseEntity<String>("Task deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Task not found", HttpStatus.NOT_FOUND);
        }
    }
}
