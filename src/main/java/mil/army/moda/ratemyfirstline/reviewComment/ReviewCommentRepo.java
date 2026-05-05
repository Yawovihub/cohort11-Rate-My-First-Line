package mil.army.moda.ratemyfirstline.reviewComment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ReviewCommentRepo extends JpaRepository<ReviewComment, Long> {
    @Query("SELECT rc FROM ReviewComment rc JOIN FETCH rc.review WHERE rc.review.id = :id")
    List<ReviewComment> findByReviewId(Long id);


}
