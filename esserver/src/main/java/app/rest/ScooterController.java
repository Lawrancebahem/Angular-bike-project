package app.rest;


import app.models.Scooter;
import app.repositories.ScooterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


  @GetMapping("/scooter/{id}")
  public Scooter findScooterById(@PathVariable int id){
    return this.scooterRepository.findById(id);
  }

//  @PostMapping
//  public Scooter addScooter(@RequestBody Scooter scooter){
//    return this.scooterRepository.save(scooter);
//  }

  @RequestMapping(value = "/scooter/{id}" , method = {RequestMethod.PUT, RequestMethod.POST})
  public Scooter saveOrUpdateScooterPut(@PathVariable int id,@RequestBody Scooter scooter){
    scooter.setId(id);
    return this.scooterRepository.save(scooter);
  }

  @DeleteMapping("/scooter/{id}")
  public boolean deleteScooter(@PathVariable int id){
    return this.scooterRepository.deleteById(id);
  }
}
