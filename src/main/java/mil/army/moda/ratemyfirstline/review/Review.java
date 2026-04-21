package mil.army.moda.ratemyfirstline.review;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Review {

@GeneratedValue
@Id
private Long id;

    public Review(Long leaderId, double rating, String description, LocalDate date) {
        LeaderId = leaderId;
        this.rating = rating;
        this.description = description;
        this.date = date;
    }

   private Long LeaderId;

    private double rating;

    private String description;

    public LocalDate getDate() {
        return date;
    }

    public Review setDate(LocalDate date) {
        this.date = date;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Review setDescription(String description) {
        this.description = description;
        return this;
    }

    public double getRating() {
        return rating;
    }

    public Review setRating(double rating) {
        this.rating = rating;
        return this;
    }

    public Long getLeaderId() {
        return LeaderId;
    }

    public Review setLeaderId(Long leaderId) {
        LeaderId = leaderId;
        return this;
    }

    public Long getId() {
        return id;
    }

    public Review setId(Long id) {
        this.id = id;
        return this;
    }

    private LocalDate date;


    public Review() {
    }
}
