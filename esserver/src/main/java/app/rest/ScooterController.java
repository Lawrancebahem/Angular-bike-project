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
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/scooters")
public class ScooterController {

  @Autowired
  private ScooterRepository scooterRepository;

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


  @GetMapping("/{id}")
  public Scooter findScooterById(@PathVariable int id) {
    Scooter foundScooter = scooterRepository.findById(id);
    if (foundScooter == null) throw new ResourceNotFound("The id does not exist");
    return this.scooterRepository.findById(id);
  }

  @PostMapping
  public ResponseEntity<Scooter> addScooter(@RequestBody Scooter scooter) {
    Scooter savedScooter = this.scooterRepository.save(scooter);
    URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("scooter/{id}").buildAndExpand(savedScooter).toUri();
    return ResponseEntity.created(location).body(savedScooter);
  }

  @RequestMapping(value = "/{id}", method = {RequestMethod.PUT, RequestMethod.POST})
  public ResponseEntity<Scooter> saveOrUpdateScooter(@PathVariable int id, @RequestBody Scooter scooter) {
    if (id != scooter.getId()) throw new PreConditionalFailed("The id does not match the given id in the body");
    Scooter savedScooter = this.scooterRepository.save(scooter);
    URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/scooter/{id}").buildAndExpand(savedScooter).toUri();
    return ResponseEntity.created(location).body(savedScooter);
  }

  @DeleteMapping("/{id}")
  public boolean deleteScooter(@PathVariable int id) {
    Scooter foundScooter = scooterRepository.findById(id);
    if (foundScooter == null) throw new ResourceNotFound("The id does not exist");
    return this.scooterRepository.deleteById(id);
  }

  @GetMapping("/summary")
  @JsonView(Scooter.ShowScooterSummary.class)
  public List<Scooter> getScootersSummary(){
    return this.scooterRepository.findAll();
  }
}
