package app.rest;


import app.Exception.PreConditionalFailed;
import app.Exception.ResourceNotFound;
import app.models.Scooter;
import app.repositories.ScooterRepository;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/scooters")
public class ScooterController {

  @Autowired
  private ScooterRepository<Scooter> scooterRepository;

  @GetMapping
  public List<Scooter>getScooters(){
    return this.scooterRepository.findAll();
  }

  @GetMapping("/scooter")
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
  public Scooter findScooterById(@PathVariable int id) {
    return this.scooterRepository.findById(id);
  }

  @PostMapping
  public ResponseEntity<Scooter> addScooter(@RequestBody Scooter scooter) {
    Scooter savedScooter = this.scooterRepository.save(scooter);
    URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("scooter/{id}").buildAndExpand(savedScooter).toUri();
    return ResponseEntity.created(location).body(savedScooter);
  }

  @RequestMapping(value = "/scooter/{id}", method = {RequestMethod.PUT, RequestMethod.POST})
  public ResponseEntity<Scooter> saveOrUpdateScooter(@PathVariable int id, @RequestBody Scooter scooter) {
    if (id != scooter.getId()) throw new PreConditionalFailed("The id does not match the given id in the body");
    scooter.setId(id);
    Scooter savedScooter = this.scooterRepository.save(scooter);
    URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/scooter/{id}").buildAndExpand(savedScooter).toUri();
    return ResponseEntity.created(location).body(savedScooter);
  }

  @DeleteMapping("/scooter/{id}")
  public boolean deleteScooter(@PathVariable int id) {
    return this.scooterRepository.deleteById(id);
  }

  @GetMapping("/scooters/summary")
  @JsonView(Scooter.ShowScooterSummary.class)
  public List<Scooter> getScootersSummary(){
    return this.scooterRepository.findAll();
  }
}
