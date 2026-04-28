package mil.army.moda.ratemyfirstline.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r JOIN FETCH r.leader")
    List<Review> findAllWithLeader();
    // N+1 problem, for every review it's firing a separate SELECT to load the leader
    // with N reviews you get N extra queries
}