package mil.army.moda.ratemyfirstline.leader;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LeaderServiceTest {
    @Mock
    private LeaderRepository leaderRepository;

    @InjectMocks
    LeaderService leaderService;

    @Test
    void shouldAddNewLeader(){
        //Arrange
        Leader leader = new Leader("fname","lname", "jobTitle");
        when(leaderRepository.save(any(Leader.class))).thenReturn(leader);

        //Act
        Leader result= leaderService.saveLeader(leader);

        //Assertion
        assertThat(result.getFname()).isEqualTo("fname");
        verify(leaderRepository, times(1)).save(leader);
    }

    @Test
    void shouldReturnAnExistingLeader(){
        //Arrange
        Leader leader = new Leader("fname1","lname1", "jobTitle1");
        when(leaderRepository.findById(anyLong())).thenReturn(Optional.of(leader));

        //Act
        Optional<Leader> leader2 = leaderService.getById(1L);

        //Assert
        assertThat(leader2.get().getFname()).isEqualTo("fname1");
        verify(leaderRepository).findById(1L);
    }

    @Test
    void shouldDeleteAExistingLeader(){
        //Arrange
        Leader leader = new Leader("fname2","lname2", "jobTitle2");
        doNothing().when(leaderRepository).delete(any());

        leaderService.deleteLeader(leader);
        verify(leaderRepository).delete(leader);

    }
}
