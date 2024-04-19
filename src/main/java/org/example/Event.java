package org.example;

import java.time.LocalDateTime;

public class Event {
    private String title;
    private String description;
    private LocalDateTime dateTime;
    private LocalDateTime deadline;
    private String courseId;
    private String eventType;

    // constructors, getters and setters
    public Event(String title, String description, LocalDateTime deadline, String courseId, String eventType) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.courseId = courseId;
        this.eventType = eventType;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public String getCourseId() {
        return courseId;
    }

    public String getEventType() {
        return eventType;
    }
}