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
class TaskServiceTest {

    @Mock
    private Connection connection;
    
    @Mock
    private PreparedStatement preparedStatement;
    
    @Mock
    private ResultSet resultSet;

    private TaskService taskService;

    @BeforeEach
    void setUp() throws Exception {
        taskService = new TaskService() {
            @Override
            protected Connection getConnection() {
                return connection;
            }
        };
        when(connection.prepareStatement(anyString())).thenReturn(preparedStatement);
    }

    @Test
    void addTaskSuccessfully() throws Exception {
        when(preparedStatement.executeUpdate()).thenReturn(1);
        taskService.addTask("Homework", "Math exercises", "2024-01-01");
        verify(preparedStatement, times(1)).executeUpdate();
    }

    @Test
    void searchTaskFound() throws Exception {
        when(connection.prepareStatement(anyString())).thenReturn(preparedStatement);
        when(preparedStatement.executeQuery()).thenReturn(resultSet);
        when(resultSet.next()).thenReturn(true).thenReturn(false); // Simulate one result found
        when(resultSet.getString("title")).thenReturn("Homework");
        when(resultSet.getString("description")).thenReturn("Math exercises");
        when(resultSet.getString("deadline")).thenReturn("2024-01-01");

        var tasks = taskService.searchTasks("Homework");
        assertFalse(tasks.isEmpty());
        assertEquals("Homework", tasks.get(0).getTitle());
    }
}
