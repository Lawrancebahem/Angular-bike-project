package app;

import app.models.Scooter;
import app.models.Trip;
import app.repositories.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootApplication
public class EsserverApplication implements CommandLineRunner {

  @Autowired
  @Qualifier("scooterRepositoryJpa")
  private EntityRepository<Scooter> scooterRepository;

  @Autowired
  @Qualifier("tripsRepositoryJpa")
  private EntityRepository<Trip> tripEntityRepository;

  public static void main(String[] args) {
    SpringApplication.run(EsserverApplication.class, args);
  }

  @Transactional
  @Override
  public void run(String... args) throws Exception {
    System.out.println("Running CommandLine Startup");
    this.createInitialScooters();
  }

  private void createInitialScooters() {

    List<Scooter> scooters = this.scooterRepository.findAll();

    if (scooters != null && scooters.size() > 0) return;
    System.out.println("Configuring some initial scooter data");
    for (int i = 0; i < 7; i++) {
      Scooter scooter = Scooter.creatRandomScooter();

      Trip trip = scooter.startNewTrip(Trip.generateRandomTime());
      if (trip != null) {
        scooter.addTrip(trip);
        scooter.setStatus(Scooter.StatusScooter.IN_USE);
        this.scooterRepository.save(scooter);
        trip.setScooter(scooter);
        tripEntityRepository.save(trip);
      } else {
        if (scooter.getStatus().equals(Scooter.StatusScooter.IN_USE)) {
          //To be added as IN_USE later on, while checking out for a trip if the scooter's status IDLE
          scooter.setStatus(Scooter.StatusScooter.IDLE);
        }
        scooterRepository.save(scooter);
      }
    }
  }
}

