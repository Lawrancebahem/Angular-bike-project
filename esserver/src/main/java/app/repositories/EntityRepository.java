package app.repositories;


import java.util.List;

public interface EntityRepository<T extends Identifiable> {
  List<T>findAll();

  T findById(int id);
  T save(T e);
  List<T> findByQuery(String jpqlName, Object...params);

  boolean deleteById(int id);
}
