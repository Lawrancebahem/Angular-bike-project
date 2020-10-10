package app.repositories;
import app.models.Scooter;

import java.util.List;

public interface ScooterRepository<E> {
  List<E>findAll();

  E findById(int id);
  E save(E e);

  boolean deleteById(int id);
}
