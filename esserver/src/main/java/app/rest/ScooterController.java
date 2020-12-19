package app.rest;


import app.Exception.PreConditionalFailed;
import app.Exception.ResourceNotFound;
import app.Exception.UnAuthorizedException;
import app.models.CustomJson;
import app.models.Scooter;
import app.models.Trip;
import app.repositories.EntityRepository;
import app.utilities.JWToken;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.swing.*;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/scooters")
@CrossOrigin(origins = "http://localhost:4200/")
public class ScooterController {

  @Autowired
  @Qualifier("scooterRepositoryJpa")
  private EntityRepository<Scooter> scooterRepository;

  @Autowired
  @Qualifier("tripsRepositoryJpa")
  private EntityRepository<Trip> tripEntityRepository;


  @GetMapping(path = "", produces = "application/json")
  public List<Scooter> getScooters(@RequestParam(required = false)Integer battery,
                                   @RequestParam(required = false) String status,
//                                   @RequestAttribute(name = JWToken.JWT_ATTRIBUTE_NAME, required = true) JWToken jwToken,
                                   WebRequest webRequest) {
//    if (!jwToken.getUsername().equalsIgnoreCase("Nico")){
//      throw new UnAuthorizedException("You're not mister Nico to see the scooters");
//    }
    if (webRequest.getParameterMap().size() > 1) throw new PreConditionalFailed("There are too many parameters, provide just one!");
    if (status != null){
      if (Arrays.stream(Scooter.StatusScooter.values()).noneMatch(statusScooter -> statusScooter.name().equalsIgnoreCase(status))){
        throw new PreConditionalFailed("The given status does not exit, please provide one of the following statuses(IDLE, INUSE, MAINTENANCE)");
      }
      return this.scooterRepository.findByQuery("Scooter_find_by_status", Scooter.StatusScooter.valueOf(status));
    }else if (battery != null){
      return this.scooterRepository.findByQuery("Scooter_find_by_battery", battery);
    }
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
  public Scooter findScooterById(@PathVariable int id, HttpServletRequest request) throws AuthenticationException {
    String encryptedToken = request.getHeader(HttpHeaders.AUTHORIZATION);
    System.out.println("the toke is " + encryptedToken);
    if (encryptedToken == null) throw new AuthenticationException("You need to log in");
    Scooter foundScooter = scooterRepository.findById(id);
    if (foundScooter == null && id != 0) throw new ResourceNotFound("The id does not exist");
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
    foundScooter.getTrips().clear();
    this.scooterRepository.save(foundScooter);
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


  /**
   * To retrieve the current trips of scooters
   *
   */
//  @JsonView(Scooter.ShowCurrentTrip.class)
  @GetMapping("/currenttrips")
  public List<Trip> getCurrentTrips(){
    return this.tripEntityRepository.findByQuery("Trip_find_current_from_scooter");
  }
}
