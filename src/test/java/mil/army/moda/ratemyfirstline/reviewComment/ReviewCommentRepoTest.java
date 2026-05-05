package mil.army.moda.ratemyfirstline.reviewComment;


import mil.army.moda.ratemyfirstline.review.Review;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

@DataJpaTest
public class ReviewCommentRepoTest {
    @Autowired
    ReviewCommentRepo reviewCommentRepo;

    @Test
    void itShouldSaveReviewComment(){

        ReviewComment comment1 = new ReviewComment(1L,"First comment");

        ReviewComment newReviewComment = reviewCommentRepo.save(comment1);
    }
}
