package mil.army.moda.ratemyfirstline.leader;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/leader")
public class LeaderController {
    private LeaderService leaderService;

    public LeaderController(LeaderService leaderService) {
        this.leaderService = leaderService;
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<Leader> leaders(){
        return leaderService.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Leader saveLeader(@RequestBody Leader leader){
        return leaderService.saveLeader(leader);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Leader> getById(@PathVariable Long id){
        Optional<Leader> leader = leaderService.getById(id);
        if (leader.isPresent()){
            return ResponseEntity.ok(leader.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Leader> updateById(@PathVariable Long id, @RequestBody Leader leader){
        Optional<Leader> foundLeader = leaderService.getById(id);
        if (foundLeader.isPresent()){
            Leader updatedLeader = leaderService.saveLeader(leader);
            return ResponseEntity.ok(updatedLeader);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

}
