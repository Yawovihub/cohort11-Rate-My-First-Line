package mil.army.moda.ratemyfirstline.leader;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaderRepository extends JpaRepository<Leader, Long> {

}
