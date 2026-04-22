package mil.army.moda.ratemyfirstline.leader;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
@ActiveProfiles("test")
class LeaderRepositoryTest {
    @Autowired
    LeaderRepository leaderRepository;

    @Test
    void shouldSaveANewLeader() {
        //Arrange
        Leader leader = new Leader("firstName", "lastName", "student");

        //Act
        Leader newLeader = leaderRepository.save(leader);
        Optional<Leader> leader2 = leaderRepository.findById(1L);

        //Assert
        assertThat(leader2.isPresent()).isTrue();
        assertThat(leader.getId()).isEqualTo(leader2.get().getId());
    }


}