package app.repositories;


import app.Exception.ResourceNotFound;
import app.models.Scooter;
import org.springframework.stereotype.Service;

import javax.security.sasl.SaslClient;
import java.util.ArrayList;
import java.util.List;

@Service("scooterRepositoryMock")
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
    return null;
  }

  @Override
  public Scooter save(Scooter scooter) {
    if (scooter.getId() == 0){
      scooter.setId(Scooter.uniqueId++);
    }
    // Argument object is not the same as our list object so we need
    // to check if the scooter exists in our list
    int index = this.scooterList.indexOf(findById(scooter.getId()));
    if(index > -1){
      this.scooterList.set(index, scooter);
    } else{
      this.scooterList.add(scooter);
    }

    return scooter;
  }

  @Override
  public boolean deleteById(int id){
    return this.scooterList.removeIf(scooter -> scooter.getId() == id);
  }
}
