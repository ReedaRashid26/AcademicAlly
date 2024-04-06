package org.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class EventControllerTest {
    private EventController eventController;

    @BeforeEach
    public void setUp() {
        eventController = new EventController();
    }

    @Test
    public void testCreateEvent() {
        Event event = new Event("Test Event", "This is a test event.", LocalDateTime.of(2022, 12, 31, 23, 59, 59), "CS101", "Lecture");
        Event createdEvent = eventController.createEvent(event);
        assertEquals(event, createdEvent);
    }

    @Test
    public void testCreateEventWithInvalidTitle() {
        Event event = new Event("", "This is a test event.", LocalDateTime.of(2022, 12, 31, 23, 59, 59), "CS101", "Lecture");
        assertThrows(IllegalArgumentException.class, () -> eventController.createEvent(event));
    }

    @Test
    public void testSearchEvents() {
        Event event = new Event("Test Event", "This is a test event.", LocalDateTime.of(2022, 12, 31, 23, 59, 59), "CS101", "Lecture");
        eventController.createEvent(event);
        List<Event> events = eventController.searchEvents("Test Event");
        assertEquals(1, events.size());
        assertEquals(event, events.get(0));
    }

    @Test
    public void testFilterEvents() {
        Event event1 = new Event("Test Event 1", "This is a test event.", LocalDateTime.of(2022, 12, 31, 23, 59, 59), "CS101", "Lecture");
        Event event2 = new Event("Test Event 2", "This is another test event.", LocalDateTime.of(2022, 12, 31, 23, 59, 59), "CS102", "Lab");
        eventController.createEvent(event1);
        eventController.createEvent(event2);
        List<Event> events = eventController.filterEvents("Lecture");
        assertEquals(1, events.size());
        assertEquals(event1, events.get(0));
    }

    @Test
    public void testSearchEventsWithInvalidTitle() {
        Event event = new Event("Test Event", "This is a test event.", LocalDateTime.of(2022, 12, 31, 23, 59, 59), "CS101", "Lecture");
        eventController.createEvent(event);
        List<Event> events = eventController.searchEvents("Nonexistent Event");
        assertTrue(events.isEmpty());
    }

    @Test
    public void testFilterEventsWithInvalidCourseIdAndEventType() {
        Event event = new Event("Test Event", "This is a test event.", LocalDateTime.of(2022, 12, 31, 23, 59, 59), "CS101", "Lecture");
        eventController.createEvent(event);
        List<Event> events = eventController.filterEvents( "Nonexistent Type");
        assertTrue(events.isEmpty());
    }
}