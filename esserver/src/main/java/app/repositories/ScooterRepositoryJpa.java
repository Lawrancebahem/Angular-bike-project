package app.repositories;

import app.Exception.ResourceNotFound;
import app.models.Scooter;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository("scooterRepositoryJpa")
public class ScooterRepositoryJpa implements EntityRepository<Scooter> {

  @PersistenceContext
  private EntityManager em;

  @Override
  public List<Scooter> findAll() {
   return this.em.createQuery("select s from Scooter s", Scooter.class).getResultList();
  }

  @Override
  public Scooter findById(int id) {
    return this.em.find(Scooter.class, id);
  }

  @Override
  public Scooter save(Scooter scooter){
    Scooter foundScooter = findById(scooter.getId());
    if (foundScooter != null){
      foundScooter = this.em.merge(scooter);
      return foundScooter;
    }
    this.em.persist(scooter);
    return scooter;
  }

  @Override
  public boolean deleteById(int id) {
    Scooter foundScooter = findById(id);
    if (foundScooter != null){
      this.em.remove(foundScooter);
      return true;
    }
    throw new ResourceNotFound("The given id of the scooter does not exist");
  }
}
