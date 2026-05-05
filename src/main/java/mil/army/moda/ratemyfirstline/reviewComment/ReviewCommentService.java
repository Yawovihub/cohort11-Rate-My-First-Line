package mil.army.moda.ratemyfirstline.reviewComment;


import mil.army.moda.ratemyfirstline.review.Review;
import mil.army.moda.ratemyfirstline.review.ReviewRepo;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewCommentService {
    private final ReviewCommentRepo reviewCommentRepo;
    private final ReviewRepo reviewRepo;
    public ReviewCommentService(ReviewCommentRepo reviewCommentRepo, ReviewRepo reviewRepo) {
        this.reviewCommentRepo = reviewCommentRepo;
        this.reviewRepo = reviewRepo;
    }

    public ReviewComment saveReviewComment(ReviewComment reviewComment, Long id){
        Optional<Review> foundReview = reviewRepo.findById(id);
        if(foundReview.isPresent()){
            System.out.println(foundReview.get().getId());
            reviewComment.setReview(foundReview.get());
            return reviewCommentRepo.save(reviewComment);
        }
        return null;
    }

    public String deleteReviewComment(Long id){
        if(id == null){
            throw new IllegalArgumentException("Id not found");
        }try{
            reviewCommentRepo.deleteById(id);
            return "deleted";
        }catch(EmptyResultDataAccessException e){
            return ("Not found!!");
        }
    }

    public List<ReviewComment> findByReviewId (Long id){
        return reviewCommentRepo.findByReviewId(id);
    }

}
