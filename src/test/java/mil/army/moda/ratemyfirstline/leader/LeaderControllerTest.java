package mil.army.moda.ratemyfirstline.leader;

import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LeaderController.class)
public class LeaderControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    LeaderService leaderService;

    Leader leader4;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        // Arrange
        leader4 = new Leader(
                "fname4",
                "Lname4",
                "job title 4");
        leader4.setId(1L);

        when(leaderService.saveLeader(any(Leader.class))).thenReturn(leader4);
    }

    @Test
    void shouldSaveANewLeader() throws Exception{
        //Act
        mockMvc.perform(post("/api/v1/leader")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(leader4)))
                .andExpect(status().isCreated());

            verify(leaderService, times(1)).saveLeader(any(Leader.class));
    }

    @Test
    void shouldFindLeaderById() throws Exception{
        //Act
        when(leaderService.getById(1L)).thenReturn(Optional.of(leader4));

        mockMvc.perform(get("/api/v1/leader/"+1L))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(leader4)));

        verify(leaderService).getById(1L);
    }
    @Test
    void shouldUpdateLeaderById() throws Exception{
        //Act

        when(leaderService.getById(anyLong())).thenReturn(Optional.of(leader4));
        Leader newLeader = new Leader("Pascal", "Putnam", "Software Developer");
        when(leaderService.saveLeader(any(Leader.class))).thenReturn(newLeader);
        mockMvc.perform(put("/api/v1/leader/" + 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newLeader))
                )
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().json(objectMapper.writeValueAsString(newLeader)));

        verify(leaderService, times(1)).getById(1L);
    }
}
