package mil.army.moda.ratemyfirstline.review;

import mil.army.moda.ratemyfirstline.leader.Leader;
import mil.army.moda.ratemyfirstline.leader.LeaderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@DataJpaTest
@ActiveProfiles("test")
class ReviewRepoTest {

    @Autowired
    ReviewRepo reviewRepo;
    @Autowired
    LeaderRepository leaderRepository;

    @Test
    void itShouldSaveReview() {
        Review test1 = new Review(new Leader(), 4.5, "Worst Ever",  LocalDate.now());

        Review newReview = reviewRepo.save(test1);
        Review getReview = reviewRepo.getReferenceById(1L);

        assertEquals(1L,getReview.getId());
        assertEquals(test1.getDescription(), getReview.getDescription());

    }

    @Test
    void itShouldGetByLeaderId(){
        Leader leader = new Leader("Wyatt", "Putnam", "Software Dev");
        leaderRepository.save(leader);
        Review test1 = new Review(leader, 4.5, "Worst Ever",  LocalDate.now());
        Review test2 = new Review(leader, 6.5, "Best", LocalDate.now());
        reviewRepo.save(test1);
        reviewRepo.save(test2);
        List<Review> newReview = reviewRepo.findByLeaderId(1L);
        assertEquals(newReview.get(0).getDate(), test1.getDate());
        assertEquals(newReview.get(1).getDate(), test2.getDate());
    }





}