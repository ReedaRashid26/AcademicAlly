package org.example;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/login")
public class LoginController {

    private List<User> users = new ArrayList<>();

    @PostMapping
    public String login(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty() || user.getUsername().matches("\\d*")) {
            throw new IllegalArgumentException("Invalid username");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty() || user.getPassword().length() > 10) {
            throw new IllegalArgumentException("Invalid password");
        }
        for (User u : users) {
            if (u.getUsername().equals(user.getUsername()) && u.getPassword().equals(user.getPassword())) {
                return "User exists";
            }
        }
        return "User does not exist";
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty() || user.getUsername().matches("\\d*")) {
            throw new IllegalArgumentException("Invalid username");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty() || user.getPassword().length() > 10) {
            throw new IllegalArgumentException("Invalid password");
        }
        users.add(user);
        return user;
    }
}