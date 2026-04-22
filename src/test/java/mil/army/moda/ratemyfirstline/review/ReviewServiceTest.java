package mil.army.moda.ratemyfirstline.review;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReviewServiceTest {
    @Mock
    private ReviewRepo reviewRepo;

    @InjectMocks
    ReviewService reviewService;

    @Test
    void shouldSaveReview(){
        Review test1 = new Review(1L, 4.5, "Worst Ever",  LocalDate.now());
        when(reviewRepo.save(any(Review.class))).thenReturn(test1);
        test1.setId(1L);
        Review saveReview = reviewService.saveReview(test1);

        assertEquals(saveReview.getId(),(test1.getId()));
        verify(reviewRepo, only()).save(any(Review.class));

    }

}