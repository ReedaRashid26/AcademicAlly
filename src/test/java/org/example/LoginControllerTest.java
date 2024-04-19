package org.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class LoginControllerTest {
    private LoginController loginController;

    @BeforeEach
    public void setUp() {
        loginController = new LoginController();
    }

    @Test
    public void testRegisterUser() {
        User user = new User("testUser", "testPassword");
        User registeredUser = loginController.register(user);
        assertEquals(user, registeredUser);
    }

    @Test
    public void testRegisterUserWithInvalidUsername() {
        User user = new User("", "testPassword");
        assertThrows(IllegalArgumentException.class, () -> loginController.register(user));
    }

    @Test
    public void testRegisterUserWithInvalidPassword() {
        User user = new User("testUser", "longpassword1234567890");
        assertThrows(IllegalArgumentException.class, () -> loginController.register(user));
    }

    @Test
    public void testLoginWithExistingUser() {
        User user = new User("testUser", "testPassword");
        loginController.register(user);
        String loginResult = loginController.login(user);
        assertEquals("User exists", loginResult);
    }

    @Test
    public void testLoginWithNonExistingUser() {
        User user = new User("testUser", "testPassword");
        String loginResult = loginController.login(user);
        assertEquals("User does not exist", loginResult);
    }

    @Test
    public void testLoginWithWrongPassword() {
        User user = new User("testUser", "testPassword");
        loginController.register(user);
        User wrongPasswordUser = new User("testUser", "wrongPassword");
        String loginResult = loginController.login(wrongPasswordUser);
        assertEquals("User does not exist", loginResult);
    }

    @Test
    public void testLoginWithInvalidUsername() {
        User user = new User("", "testPassword");
        assertThrows(IllegalArgumentException.class, () -> loginController.login(user));
    }

    @Test
    public void testLoginWithInvalidPassword() {
        User user = new User("testUser", "longpassword1234567890");
        assertThrows(IllegalArgumentException.class, () -> loginController.login(user));
    }
}