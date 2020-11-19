package app.repositories;


import java.util.List;

public interface EntityRepository<T extends Identifiable> {
  List<T>findAll();

  T findById(int id);
  T save(T e);

  boolean deleteById(int id);
}
