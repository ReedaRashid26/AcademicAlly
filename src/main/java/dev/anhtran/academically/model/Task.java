package dev.anhtran.academically.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    private ObjectId id;

    private String taskId; // New field

    @NotBlank(message = "Title cannot be blank")
    @Size(min = 1, max = 255)
    private String title;

    @NotBlank(message = "Type cannot be blank")
    private String type;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date deadline;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date created;

    public Task(String title, String type, Date deadline, Date created) {
        this.title = title;
        this.type = type;
        this.deadline = deadline;
        this.created = created;
    }

    @JsonProperty("id")
    public String getStringId() {
        return this.id != null ? this.id.toHexString() : null;
    }
}