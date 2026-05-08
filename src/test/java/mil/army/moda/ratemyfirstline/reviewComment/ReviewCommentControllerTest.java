package mil.army.moda.ratemyfirstline.reviewComment;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReviewCommentController.class)
public class ReviewCommentControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockitoBean
    ReviewCommentService reviewCommentService;

    ReviewComment firstReviewComment;

    @BeforeEach
    void setUp(){
        firstReviewComment = new ReviewComment(
                "We are Groot"
        );
        firstReviewComment.setId(1L);
        when(reviewCommentService.addUpVote(anyLong(), anyLong())).thenReturn(firstReviewComment);
        when(reviewCommentService.addDownVote(anyLong(), anyLong())).thenReturn(firstReviewComment);
    }

    @Test
    void shouldTakeUpVote() throws Exception{
        mockMvc.perform(post("/api/v1/reviewComment/1/upvote")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(1L)))
                .andExpect(status().isOk());
    }    @Test
    void shouldTakeDownVote() throws Exception{
        mockMvc.perform(post("/api/v1/reviewComment/1/downvote")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(1L)))
                .andExpect(status().isOk());
    }

}
