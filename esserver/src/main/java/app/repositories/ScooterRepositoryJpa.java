package app.repositories;

import app.models.Scooter;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository("scooterRepositoryJpa")
public class ScooterRepositoryJpa extends AbstractEntityRepositoryJpa<Scooter> {


  public ScooterRepositoryJpa() {
    super(Scooter.class);
  }
}
