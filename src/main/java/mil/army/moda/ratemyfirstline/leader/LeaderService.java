package mil.army.moda.ratemyfirstline.leader;


import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service

public class LeaderService {

    private LeaderRepository leaderRepository;

    public LeaderService(LeaderRepository leaderRepository) {
        this.leaderRepository= leaderRepository;
    }

    public Leader saveLeader(Leader leader){
            return leaderRepository.save(leader);
    }

    public Optional<Leader> getById(Long id){
            return leaderRepository.findById(id);
    }

    public void deleteLeader(Leader leader){
            leaderRepository.delete(leader);
    }
    public List<Leader> getAll(){
        return leaderRepository.findAll();
    }
}
