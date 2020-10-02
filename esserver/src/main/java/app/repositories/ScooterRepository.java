package app.repositories;
import java.util.List;

public interface ScooterRepository<E> {
  List<E>findAll();
}
