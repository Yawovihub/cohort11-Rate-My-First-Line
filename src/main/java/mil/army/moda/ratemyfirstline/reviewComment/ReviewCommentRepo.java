package mil.army.moda.ratemyfirstline.reviewComment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ReviewCommentRepo extends JpaRepository<ReviewComment, Long> {
    List<ReviewComment> findByReviewId(Long Id);

}
