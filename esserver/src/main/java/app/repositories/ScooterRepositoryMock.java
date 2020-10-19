package app.repositories;


import app.Exception.ResourceNotFound;
import app.models.Scooter;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ScooterRepositoryMock implements ScooterRepository {
  private final List<Scooter> scooterList = new ArrayList<>();

  public ScooterRepositoryMock() {
    for (int i = 0; i < 7; i++) {
      scooterList.add(Scooter.creatRandomScooter());
    }
  }

  @Override
  public List<Scooter> findAll() {
    return scooterList;
  }

  @Override
  public Scooter findById(int id){
    for (Scooter scooter : scooterList){
      if (scooter.getId() == id){
        return scooter;
      }
    }
    throw new ResourceNotFound("There is no scooter with such an id: " + id);
  }

  @Override
  public Scooter save(Scooter scooter) {
    if (scooter.getId() == 0){
      scooter.setId(Scooter.uniqueId++);
    }
    Scooter foundScooter = findById(scooter.getId());
    if (foundScooter == null){
      this.scooterList.add(scooter);
    }else {
      int indexPreviousScooter = this.scooterList.indexOf(foundScooter);
      scooter.setId(foundScooter.getId());
      this.scooterList.set(indexPreviousScooter, scooter);
    }
    return scooter;
  }

  @Override
  public boolean deleteById(int id){
    findById(id);
    return this.scooterList.removeIf(scooter -> scooter.getId() == id);
  }
}
