package org.example;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskService = new TaskService();
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void addTask() {
        assertTrue(taskService.addTask("Math Homework", "Complete algebra problems", "2024-01-01"));
        assertTrue(taskService.addTask("Science Project", "Work on the science fair project", "2024-02-01"));
        assertTrue(taskService.addTask("Math Quiz Preparation", "Prepare for the upcoming math quiz", "2024-01-15"));
    }

    @Test
    void searchTasks() {
        assertFalse(taskService.searchTasks("Math Homework").isEmpty());
        assertFalse(taskService.searchTasks("Science Project").isEmpty());
        assertFalse(taskService.searchTasks("Math Quiz Preparation").isEmpty());
    }
}