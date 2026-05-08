package mil.army.moda.ratemyfirstline.reviewComment;


import mil.army.moda.ratemyfirstline.leader.Leader;
import mil.army.moda.ratemyfirstline.leader.LeaderRepository;
import mil.army.moda.ratemyfirstline.review.Review;
import mil.army.moda.ratemyfirstline.review.ReviewRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

@DataJpaTest
@ActiveProfiles("Test")
public class ReviewCommentRepoTest {
    @Autowired
    ReviewCommentRepo reviewCommentRepo;

    @Autowired
    LeaderRepository leaderRepository;

    @Autowired
    ReviewRepo reviewRepo;

    Leader newLeader;
    Review newReview;

    @BeforeEach
    void setUp() {
        newLeader = new Leader("Lara", "Croft", "Tomb Raider");
        newReview = new Review(newLeader, 5.0, "Not Angelina Jolie", LocalDate.now());
        leaderRepository.save(newLeader);
        reviewRepo.save(newReview);
    }


    @Test
    void itShouldSaveReviewComment() {


        ReviewComment comment1 = new ReviewComment("First comment");
        comment1.setReview(reviewRepo.getReferenceById(1L));
        ReviewComment newReviewComment = reviewCommentRepo.save(comment1);
    }

    @Test
    void itShouldAddUpvote() {
        ReviewComment comment1 = new ReviewComment("First comment");
        comment1.setReview(reviewRepo.getReferenceById(1L));
        ReviewComment newReviewComment = reviewCommentRepo.save(comment1);

        ReviewComment updatedComment1 = reviewCommentRepo.getReferenceById(comment1.getId());
        updatedComment1.setUp(1L);

        reviewCommentRepo.save(updatedComment1);
        ReviewComment updatedLatest = reviewCommentRepo.getReferenceById(1L);

        assert (updatedLatest.getUp()).equals(1L);

    }

    @Test
    void itShouldAddDownvote() {
        ReviewComment comment1 = new ReviewComment("First comment");
        comment1.setReview(reviewRepo.getReferenceById(1L));
        ReviewComment newReviewComment = reviewCommentRepo.save(comment1);

        ReviewComment updatedComment1 = reviewCommentRepo.getReferenceById(comment1.getId());
        updatedComment1.setDown(1L);

        reviewCommentRepo.save(updatedComment1);
        ReviewComment updatedLatest = reviewCommentRepo.getReferenceById(1L);

        assert (updatedLatest.getDown()).equals(1L);

    }


}
