package app.rest;


import app.Exception.PreConditionalFailed;
import app.Exception.ResourceNotFound;
import app.models.Scooter;
import app.models.Trip;
import app.repositories.EntityRepository;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.swing.plaf.IconUIResource;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/scooters")
public class ScooterController {

  @Autowired
//  @Qualifier("scooterRepositoryJpa")
  private EntityRepository<Scooter> scooterRepository;

  @Autowired
  @Qualifier("tripsRepositoryJpa")
  private EntityRepository<Trip> tripEntityRepository;

  @GetMapping
  public List<Scooter> getScooters() {
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
    return foundScooter;
  }

  @PostMapping
  public ResponseEntity<Scooter> addScooter(@RequestBody Scooter scooter) {
//    scooter.setId(Scooter.uniqueId++);
    Scooter savedScooter = this.scooterRepository.save(scooter);
    URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("scooter/{id}").buildAndExpand(savedScooter).toUri();
    return ResponseEntity.created(location).body(savedScooter);
  }

  @RequestMapping(value = "/{id}", method = {RequestMethod.PUT, RequestMethod.POST})
  public ResponseEntity<Scooter> saveOrUpdateScooter(@PathVariable int id, @RequestBody Scooter scooter) {
    System.out.println("The parm id " + id + " and the scooter id " + scooter.getId());
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
  public List<Scooter> getScootersSummary() {
    return this.scooterRepository.findAll();
  }


  /**
   * The endpoint is on purpose added like that, due to another endpoint (POS-PUT methods line: 66)
   * @param id
   * @param startTime
   * @return
   */
  @PostMapping("/scooters/{id}")
  public ResponseEntity<Scooter> addTrip(@PathVariable int id, @RequestBody(required = false) LocalDateTime startTime) {
    Scooter foundScooter = this.scooterRepository.findById(id);
    if (foundScooter.getChargeBattery() < 10)
      throw new PreConditionalFailed("The battery status of the scooter is less than 10%");
    Trip trip = foundScooter.startNewTrip(Trip.generateRandomTime());
    if (trip != null) {
      if (startTime != null) {
        trip.setStart(startTime);
      }
      foundScooter.addTrip(trip);
      foundScooter.setStatus(Scooter.StatusScooter.IN_USE);
      this.scooterRepository.save(foundScooter);
      trip.setScooter(foundScooter);
      tripEntityRepository.save(trip);


      Scooter savedScooter = this.scooterRepository.save(foundScooter);
      URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/scooter/{id}").buildAndExpand(savedScooter).toUri();
      return ResponseEntity.created(location).body(savedScooter);


    } else {
      throw new PreConditionalFailed("The scooter does not have status 'IDLE");
    }
  }
}
