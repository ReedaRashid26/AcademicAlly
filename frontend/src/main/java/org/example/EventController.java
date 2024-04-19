package org.example;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private List<Event> events = new ArrayList<>();

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        if (event.getTitle() == null || event.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }
        events.add(event);
        return event;
    }

    @GetMapping("/search")
    public List<Event> searchEvents(@RequestParam(required = false) String title) {
        if (title == null) {
            return events;
        } else {
            return events.stream()
                    .filter(event -> event.getTitle().equals(title))
                    .collect(Collectors.toList());
        }
    }

    @GetMapping("/filter")
    public List<Event> filterEvents(@RequestParam(required = false) String eventType) {
        return events.stream()
                .filter(event -> eventType == null || event.getEventType().equalsIgnoreCase(eventType))
                .collect(Collectors.toList());
    }

    @GetMapping("/sort")
    public List<Event> sortEvents(@RequestParam(required = false) String eventType, @RequestParam(required = false) String deadline) {
        return events.stream()
                .filter(event -> eventType == null || event.getEventType().equals(eventType))
                .sorted(Comparator.comparing(Event::getDeadline))
                .collect(Collectors.toList());
    }
}
