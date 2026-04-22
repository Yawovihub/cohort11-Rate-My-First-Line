package mil.army.moda.ratemyfirstline.leader;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/leader")
public class LeaderController {
    private LeaderService leaderService;

    public LeaderController(LeaderService leaderService) {
        this.leaderService = leaderService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Leader saveLeader(@RequestBody Leader leader){
        return leaderService.saveLeader(leader);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Leader> getById(@PathVariable Long id){
        try {
            Optional<Leader> leader = leaderService.getById(id);
            return ResponseEntity.ok(leader.get());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }

    }

}
