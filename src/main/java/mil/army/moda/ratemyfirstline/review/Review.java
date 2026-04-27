package mil.army.moda.ratemyfirstline.review;

import jakarta.persistence.*;
import mil.army.moda.ratemyfirstline.leader.Leader;

import java.time.LocalDate;

@Entity
public class Review {

@GeneratedValue
@Id
private Long id;



    public Review(Leader leader, double rating, String description, LocalDate date) {
        this.leader = leader;
        this.rating = rating;
        this.description = description;
        this.date = date;
    }


    @ManyToOne
    @JoinColumn(name="leader_id", referencedColumnName = "id", nullable = false)
    private Leader leader;



    private double rating;

    @Column(columnDefinition = "TEXT")
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


    public Review setLeader(Leader leader) {
        this.leader = leader;
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
