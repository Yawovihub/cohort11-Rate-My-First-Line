package mil.army.moda.ratemyfirstline.review;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Review saveReview(@RequestBody Review review) {
        return reviewService.saveReview(review);}

    @GetMapping()
    public List<Review> findAllReviews() {
        return reviewService.findAllReviews();
    }

    @GetMapping("/leader/{id}")
    public List<Review> findAllByLeaderId(@PathVariable Long id){
        return reviewService.findReviewsByLeaderId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> findReviewById (@PathVariable Long id){
        return null;
    }
}
