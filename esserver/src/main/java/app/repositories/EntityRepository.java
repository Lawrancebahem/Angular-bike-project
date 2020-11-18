package app.repositories;
import app.Exception.ResourceNotFound;
import app.models.Scooter;


import java.util.List;

public interface EntityRepository<T> {
  List<T>findAll();

  T findById(int id);
  T save(T e);

  boolean deleteById(int id);
}
