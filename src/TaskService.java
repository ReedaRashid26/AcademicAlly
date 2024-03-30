import java.util.ArrayList;
import java.util.List;

public class TaskService {
    // Adds a new task
    public void addTask(String title, String description, String deadline) {
        String sql = "INSERT INTO tasks(title, description, deadline) VALUES(?,?,?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, title);
            pstmt.setString(2, description);
            pstmt.setString(3, deadline);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    // Searches tasks by title
    public List<Task> searchTasks(String query) {
        String sql = "SELECT * FROM tasks WHERE title LIKE ?";
        List<Task> tasks = new ArrayList<>();
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, "%" + query + "%");
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Task task = new Task(
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getString("deadline"));
                tasks.add(task);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return tasks;
    }
}
