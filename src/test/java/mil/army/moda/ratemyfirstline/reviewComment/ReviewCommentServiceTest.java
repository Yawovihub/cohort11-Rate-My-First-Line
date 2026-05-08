package mil.army.moda.ratemyfirstline.reviewComment;

import mil.army.moda.ratemyfirstline.leader.LeaderRepository;
import mil.army.moda.ratemyfirstline.review.ReviewRepo;
import mil.army.moda.ratemyfirstline.review.ReviewService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;


import javax.swing.text.html.Option;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReviewCommentServiceTest {

    @Mock
    ReviewCommentRepo reviewCommentRepo;

    @InjectMocks
    ReviewCommentService reviewCommentService;

    @Test
    void shouldSaveUpVote(){
        ReviewComment newComment = new ReviewComment("AND THEN");

        when(reviewCommentRepo.save(any(ReviewComment.class))).thenReturn(newComment);

        when(reviewCommentRepo.findById(anyLong())).thenReturn(Optional.of(newComment));

        reviewCommentService.addUpVote(1L, 1L);
        verify(reviewCommentRepo, times(1)).save(any(ReviewComment.class));
        verify(reviewCommentRepo, times(1)).findById(anyLong());
    }
    @Test
    void shouldSaveDownVote(){
        ReviewComment newComment = new ReviewComment("AND THEN");

        when(reviewCommentRepo.save(any(ReviewComment.class))).thenReturn(newComment);

        when(reviewCommentRepo.findById(anyLong())).thenReturn(Optional.of(newComment));

        reviewCommentService.addDownVote(1L, 1L);
        verify(reviewCommentRepo, times(1)).save(any(ReviewComment.class));
        verify(reviewCommentRepo, times(1)).findById(anyLong());
    }










}
