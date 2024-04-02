package org.example;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {
    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService();
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void registerUser() {
        assertTrue(userService.registerUser("user1", "password123"), "User should be registered successfully.");
    }

    @Test
    public void testRegisterUserAlreadyExists() {
        userService.registerUser("user1", "password123");
        assertFalse(userService.registerUser("user1", "password123"), "Registering an existing user should fail.");
    }

    @Test
    void authenticateUser() {
        userService.registerUser("user2", "password456");
        assertTrue(userService.authenticateUser("user2", "password456"), "Authentication should succeed with correct credentials.");
    }

    @Test
    public void testAuthenticateUserFail() {
        userService.registerUser("user3", "password789");
        assertFalse(userService.authenticateUser("user3", "wrongpassword"), "Authentication should fail with incorrect credentials.");
    }
}