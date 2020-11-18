package app.repositories;


import app.models.Trip;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;


@Transactional
@Repository("tripsRepositoryJpa")
public class TripsRepositoryJpa implements EntityRepository<Trip>{


  @PersistenceContext
  private EntityManager em;

  @Override
  public List<Trip> findAll() {
    return this.em.createQuery("select t from Trip t", Trip.class).getResultList();
  }

  @Override
  public Trip findById(int id) {
    return this.em.find(Trip.class,id);
  }

  @Override
  public Trip save(Trip e) {
    this.em.persist(e);
    return e;
  }

  @Override
  public boolean deleteById(int id) {
    Trip trip = findById(id);
    if (trip != null){
     this.em.remove(trip);
     return true;
    }
    return false;
  }
}
