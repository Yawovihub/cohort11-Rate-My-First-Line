package mil.army.moda.ratemyfirstline.reviewComment;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reviewComment")
public class ReviewCommentController {
    private final ReviewCommentService reviewCommentService;

    public ReviewCommentController(ReviewCommentService reviewCommentService) {
        this.reviewCommentService = reviewCommentService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewComment saveReviewComment(@RequestBody ReviewComment reviewComment){
        return reviewCommentService.saveReviewComment(reviewComment);
    }

    @GetMapping("/reviewComment/{id}")
    public List<ReviewComment> findAllByReviewId(@PathVariable Long id){
        return reviewCommentService.findByReviewId(id);
    }

    @DeleteMapping("/{reviwComment/{id}")
    public ResponseEntity<Void> deletReviewComment(@PathVariable Long id){
        reviewCommentService.deleteReviewComment(id);
        return ResponseEntity.noContent().build();
    }

}
