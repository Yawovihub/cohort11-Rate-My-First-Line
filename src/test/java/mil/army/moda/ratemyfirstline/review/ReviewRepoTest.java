package mil.army.moda.ratemyfirstline.review;

import mil.army.moda.ratemyfirstline.leader.Leader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;

@DataJpaTest
@ActiveProfiles("test")
class ReviewRepoTest {

    @Autowired
    ReviewRepo reviewRepo;

    @Test
    void itShouldSaveReview() {
        Review test1 = new Review(new Leader(), 4.5, "Worst Ever",  LocalDate.now());

        Review newReview = reviewRepo.save(test1);
        Review getReview = reviewRepo.getReferenceById(1L);

        assertEquals(1L,getReview.getId());
        assertEquals(test1.getDescription(), getReview.getDescription());

    }

    @Test
    void itShouldDeleteReview() {
        doNothing().when(reviewRepo).delete(deleteRevpe);

    }





}