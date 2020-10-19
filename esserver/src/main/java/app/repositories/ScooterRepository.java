package app.repositories;
import app.Exception.ResourceNotFound;
import app.models.Scooter;


import java.util.List;

public interface ScooterRepository {
  List<Scooter>findAll();

  Scooter findById(int id) throws ResourceNotFound;
  Scooter save(Scooter e) throws ResourceNotFound;

  boolean deleteById(int id) throws ResourceNotFound;
}
