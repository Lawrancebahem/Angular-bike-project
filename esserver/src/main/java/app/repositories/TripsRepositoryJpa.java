package app.repositories;


import app.models.Trip;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;

@Transactional
@Repository("tripsRepositoryJpa")
public class TripsRepositoryJpa extends AbstractEntityRepositoryJpa<Trip> {

  public TripsRepositoryJpa() {
    super(Trip.class);
  }

}
