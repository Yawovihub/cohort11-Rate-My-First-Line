package mil.army.moda.ratemyfirstline.review;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepo reviewRepo;

    public ReviewService(ReviewRepo reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    public Review saveReview(Review review) {
        return reviewRepo.save(review);

    }

    public List<Review> findAllReviews(){
        return reviewRepo.findAll();
    }

    public Review findReviewById (Long id){
        return reviewRepo.findById(id).orElseThrow();
    }
}
