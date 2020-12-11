package app.repositories;


import app.Exception.ResourceNotFound;
import app.models.Scooter;
import app.models.Trip;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;


@Transactional
public abstract class AbstractEntityRepositoryJpa <E extends  Identifiable> implements EntityRepository<E>{

  @PersistenceContext
  protected EntityManager em;

  private Class<E> theEntityClass;

  public AbstractEntityRepositoryJpa(Class<E> theEntityClass) {
    this.theEntityClass = theEntityClass;
    System.out.println("Created " + this.getClass().getName() + "<" + this.theEntityClass.getSimpleName()+">");
  }

  @Override
  public List<E> findAll() {
    CriteriaBuilder builder = em.getCriteriaBuilder();
    CriteriaQuery<E> query = builder.createQuery(theEntityClass);
    Root<E> root = query.from(theEntityClass);
    return em.createQuery(query.select(root)).getResultList();
  }

  @Override
  public E findById(int id) {
    return this.em.find(theEntityClass, id);
  }

  @Override
  public E save(E e) {
    E foundInstance = findById(e.getId());
    if (foundInstance != null) {
      // Add trips to detached entity, if any
      if(foundInstance instanceof Scooter){
        List<Trip> tripList = ((Scooter) foundInstance).getTrips();
        for(Trip trip : tripList){
          ((Scooter) e).addTrip(trip);
        }
      }
      foundInstance = this.em.merge(e);
      return foundInstance;
    }
    this.em.persist(e);
    return e;
  }

  @Override
  public boolean deleteById(int id) throws ResourceNotFound {
    E foundInstance = findById(id);
    if (foundInstance != null) {
      this.em.remove(foundInstance);
      return true;
    }
    throw new ResourceNotFound("The given id does not exist");
  }

  @Override
  public List<E> findByQuery(String jpqlName, Object ... params) {
    Query query = em.createNamedQuery(jpqlName);
    if (params.length > 0){
      query.setParameter(1, params[0]);
    }
    return query.getResultList();
  }
}
