package app.repositories;


import app.models.Scooter;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ScooterRepositoryMock implements ScooterRepository<Scooter> {
  private List<Scooter> scooterList = new ArrayList<>();

  public ScooterRepositoryMock() {

    for (int i = 0; i < 7; i++) {
      scooterList.add(Scooter.creatRandomScooter());
    }
  }

  @Override
  public List<Scooter> findAll() {
    return scooterList;
  }
}
