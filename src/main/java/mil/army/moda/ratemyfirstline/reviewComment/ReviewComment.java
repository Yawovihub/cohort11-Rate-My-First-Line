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

    @Column(name = "upvote")
    private Long up;

    @Column(name = "downvote")
    private Long down;


    public ReviewComment(String reviewComment) {
        this.reviewComment = reviewComment;
    }

    public ReviewComment() {

    }

    public String getReviewComment() {
        return reviewComment;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public ReviewComment setReviewComment(String reviewComment) {
        this.reviewComment = reviewComment;
        return this;
    }

    public Long getUp() {
        return up;
    }

    public void setUp(Long up) {
        this.up = up;
    }

    public Long getDown() {
        return down;
    }

    public void setDown(Long down) {
        this.down = down;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
