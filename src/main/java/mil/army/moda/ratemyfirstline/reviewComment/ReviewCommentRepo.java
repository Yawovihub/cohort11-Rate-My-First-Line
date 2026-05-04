package mil.army.moda.ratemyfirstline.reviewComment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewCommentRepo extends JpaRepository<ReviewComment, Long> {
//    @Query("SELECT r FROM Review r JOIN FETCH r.r")
    List<ReviewComment> findByReviewId(Long id);

}
