package app.rest;


import app.models.Scooter;
import app.repositories.ScooterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/scooter")
public class ScooterController {

  @Autowired
  private ScooterRepository<Scooter>scooterRepository;

  @GetMapping("/scooters")
  public List<Scooter> getAllScooters() {
    return List.of(new Scooter("Test-scooter-A"),
      new Scooter("Test-scooter-B")
    );
  }


  @GetMapping("/scootersRandom")
  public List<Scooter> getRandomScooters() {
    return this.scooterRepository.findAll();
  }
}
