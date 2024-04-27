package dev.anhtran.academically.controller;

import dev.anhtran.academically.model.User;
import dev.anhtran.academically.repository.UserRepository;
import dev.anhtran.academically.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<List<User>>(userService.findAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<User>>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> user) {
        Optional<User> userOptional = userService.getUserByEmail(user.get("email"));
        if (userOptional.isPresent()) {
            String auth = userOptional.get().getPassword();
            if (auth.equalsIgnoreCase(user.get("password"))) {
                return new ResponseEntity<>("User " + user.get("email") + " logged in successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Username or password is incorrect", HttpStatus.UNAUTHORIZED);  // Incorrect password
            }
        }
        return new ResponseEntity<>("User not found. Please register.", HttpStatus.NOT_FOUND);  // User not found
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> user) {
        Map<String, String> errors = validateUser(user);
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }

        Optional<User> userOptional = userService.getUserByEmail(user.get("email"));
        if (userOptional.isPresent()) {
            return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
        }
        userService.registerUser(user.get("email"), user.get("password"));
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    private Map<String, String> validateUser(Map<String, String> userData) {
        Map<String, String> errors = new HashMap<>();
        String email = userData.get("email");
        String password = userData.get("password");

        if (email == null || email.trim().isEmpty()) {
            errors.put("email", "Email is required");
        } else if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            errors.put("email", "Email is not well formatted");
        }

        if (password == null || password.trim().isEmpty()) {
            errors.put("password", "Password is required");
        } else if (password.length() < 6 || password.length() > 20) {
            errors.put("password", "Password must be between 6 and 20 characters");
        }

        return errors;
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@RequestBody User user, @PathVariable ObjectId id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            User user1 = userOptional.get();
            user1.setEmail(user.getEmail());
            user1.setPassword(user.getPassword());
            userService.updateUserByID(user1);
            return new ResponseEntity<String>("User updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable ObjectId id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userService.deleteUser(user);
            return new ResponseEntity<String>("User deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
