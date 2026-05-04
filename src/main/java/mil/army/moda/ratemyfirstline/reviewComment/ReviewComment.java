package mil.army.moda.ratemyfirstline.reviewComment;

import jakarta.persistence.*;
import mil.army.moda.ratemyfirstline.review.Review;




@Entity
public class ReviewComment {
    @GeneratedValue
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "review_id",  referencedColumnName = "id", nullable = false)
    private Review review;

    @Column(columnDefinition = "TEXT")
    private String reviewComment;


    public ReviewComment(Long id, String reviewComment) {
        this.id = id;
        this.reviewComment = reviewComment;
    }

    public ReviewComment() {

    }

    public String getReviewComment() {
        return reviewComment;
    }

    public ReviewComment setReviewComment(String reviewComment) {
        this.reviewComment = reviewComment;
        return this;
    }
}
