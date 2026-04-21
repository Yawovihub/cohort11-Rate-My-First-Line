package mil.army.moda.ratemyfirstline.review;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
@DataJpaTest
@ActiveProfiles("test")
class ReviewRepoTest {

    @Autowired
    ReviewRepo reviewRepo;

    @Test
    void itShouldSaveReview() {
        Review test1 = new Review(1L, 4.5, "Worst Ever",  LocalDate.now());

        Review newReview = reviewRepo.save(test1);





    }





}