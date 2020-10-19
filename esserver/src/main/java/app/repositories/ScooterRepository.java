package app.repositories;
import app.Exception.ResourceNotFound;


import java.util.List;

public interface ScooterRepository<E> {
  List<E>findAll();

  E findById(int id) throws ResourceNotFound;
  E save(E e) throws ResourceNotFound;

  boolean deleteById(int id) throws ResourceNotFound;
}
