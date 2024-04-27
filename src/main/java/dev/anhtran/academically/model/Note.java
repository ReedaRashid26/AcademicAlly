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

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Date;

@Document(collection = "notes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private ObjectId id;

    private String noteId; // New field

    @NotBlank(message = "Title cannot be blank")
    @Size(min = 1, max = 255)
    private String title;

    @NotBlank(message = "Content cannot be blank")
    @Size(max = 5000)
    private String content;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date created;

    public Note(String title, String content) {
        this.title = title;
        this.content = content;
        this.created = new Date();
    }

    @JsonProperty("id")
    public String getStringId() {
        return this.id != null ? this.id.toHexString() : null;
    }
}
