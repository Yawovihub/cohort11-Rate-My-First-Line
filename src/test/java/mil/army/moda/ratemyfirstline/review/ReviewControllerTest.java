package mil.army.moda.ratemyfirstline.review;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.core.type.TypeReference;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(ReviewController.class)
class ReviewControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    ReviewService reviewService;

    @Captor
    ArgumentCaptor<Review> captor = ArgumentCaptor.forClass(Review.class);

    Review firstReview;

    @Mock
    private ReviewRepo reviewRepo;

    List<Review> reviews = new ArrayList<>();

    @BeforeEach
    void setup(){
        firstReview = new Review(
                1L,
                3.0,
                "This works",
                LocalDate.now()

        );
    when(reviewService.saveReview(any(Review.class))).thenReturn(firstReview);
    }

    @Test
    void shouldSaveNewReview() throws Exception{
        mockMvc.perform(post("/api/v1/review")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(firstReview)))
                .andExpect(status().isCreated());

    verify(reviewService, times(1)).saveReview(any(Review.class));
    }

    @Test
    void shouldFindAllReviews() throws Exception{
        reviews.addAll(List.of(firstReview, firstReview));

        when(reviewService.findAllReviews()).thenReturn(reviews);

        MvcResult results = mockMvc.perform(get("/api/v1/review")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andReturn();

        String jsonResponse = results.getResponse().getContentAsString();
        List<Review> responseReviews = objectMapper.readValue(
                jsonResponse, new TypeReference<List<Review>>() {}
        );

        assertThat(responseReviews).hasSize(2);

    }

    @Test
    void shouldFindById() throws Exception{
        when(reviewService.findReviewById(1L)).thenReturn(firstReview);

        String reviewJson = objectMapper.writeValueAsString(firstReview);

        mockMvc.perform(get("/api/v1/review"))
                .andExpect(status().isOk());


        verify(reviewService, only()).findReviewById(1L);
    }





}