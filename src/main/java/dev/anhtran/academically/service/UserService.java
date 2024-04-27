package dev.anhtran.academically.service;

import dev.anhtran.academically.model.User;
import dev.anhtran.academically.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(ObjectId id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void updateUserByID(User user) {
        Optional<User> temp = userRepository.findById(user.getId());
        if (temp.isPresent()) {
            User user1 = temp.get();
            user1.setEmail(user.getEmail());
            user1.setPassword(user.getPassword());
            userRepository.save(user1);
        }
    }

    public void updateUserByEmail(User user) {
        Optional<User> temp = userRepository.findByEmail(user.getEmail());
        if (temp.isPresent()) {
            User user1 = temp.get();
            user1.setEmail(user.getEmail());
            userRepository.save(user1);
        }
    }

    public void updateUserByPassword(User user) {
        Optional<User> temp = userRepository.findByEmail(user.getEmail());
        if (temp.isPresent()) {
            User user1 = temp.get();
            user1.setPassword(user.getPassword());
            userRepository.save(user1);
        }
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public User registerUser(String email, String password) {
        return userRepository.save(new User(email, password));
    }

    public User login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && (password.equalsIgnoreCase(user.get().getPassword()))) {
            return user.get();
        }
        return null;
    }
}
