import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private Connection connection;
    
    @Mock
    private PreparedStatement preparedStatement;
    
    @Mock
    private ResultSet resultSet;

    private UserService userService;

    @BeforeEach
    void setUp() throws Exception {
        userService = new UserService() {
            @Override
            protected Connection getConnection() {
                return connection;
            }
        };
        when(connection.prepareStatement(anyString())).thenReturn(preparedStatement);
    }

    @Test
    void registerUserSuccessfully() throws Exception {
        when(preparedStatement.executeUpdate()).thenReturn(1);
        assertTrue(userService.registerUser("testUser", "password123"));
    }

    @Test
    void authenticateUserSuccess() throws Exception {
        when(connection.prepareStatement(anyString())).thenReturn(preparedStatement);
        when(preparedStatement.executeQuery()).thenReturn(resultSet);
        when(resultSet.next()).thenReturn(true);
        when(resultSet.getString("password")).thenReturn("password123");

        assertTrue(userService.authenticateUser("testUser", "password123"));
    }
}
