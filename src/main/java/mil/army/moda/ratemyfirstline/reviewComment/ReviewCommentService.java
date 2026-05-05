package mil.army.moda.ratemyfirstline.reviewComment;


import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewCommentService {
    private final ReviewCommentRepo reviewCommentRepo;

    public ReviewCommentService(ReviewCommentRepo reviewCommentRepo) {
        this.reviewCommentRepo = reviewCommentRepo;
    }

    public ReviewComment saveReviewComment(ReviewComment reviewComment){
        return reviewCommentRepo.save(reviewComment);
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
