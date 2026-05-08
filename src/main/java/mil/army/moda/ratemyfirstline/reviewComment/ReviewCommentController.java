package mil.army.moda.ratemyfirstline.reviewComment;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ReviewCommentController {
    private final ReviewCommentService reviewCommentService;

    public ReviewCommentController(ReviewCommentService reviewCommentService) {
        this.reviewCommentService = reviewCommentService;
    }

    @PostMapping("/reviewComment/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewComment saveReviewComment(@RequestBody ReviewComment reviewComment, @PathVariable Long id){
        System.out.println(id);
        return reviewCommentService.saveReviewComment(reviewComment, id);
    }

    @GetMapping("/reviewComment/{id}")
    public List<ReviewComment> findAllByReviewId(@PathVariable Long id){
        return reviewCommentService.findByReviewId(id);
    }

    @DeleteMapping("/reviewComment/{id}")
    public ResponseEntity<Void> deleteReviewComment(@PathVariable Long id){
        reviewCommentService.deleteReviewComment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reviewComment/{id}/upvote")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ReviewComment> upVoteById(@PathVariable Long id, @RequestBody Long upvote){
        ReviewComment newReviewComment =  reviewCommentService.addUpVote(upvote, id);
        return ResponseEntity.ok(newReviewComment);
    }

    @PostMapping("/reviewComment/{id}/downvote")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ReviewComment> downVoteById(@PathVariable Long id, @RequestBody Long downvote){
        ReviewComment newReviewComment =  reviewCommentService.addDownVote(downvote, id);
        return ResponseEntity.ok(newReviewComment);
    }
}
