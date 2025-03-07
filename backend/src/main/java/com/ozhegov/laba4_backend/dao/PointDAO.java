package com.ozhegov.laba4_backend.dao;

import com.ozhegov.laba4_backend.model.Point;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceContext;

import java.util.List;

@ApplicationScoped
public class PointDAO implements DAO<Point>{
//    private final EntityManagerFactory emf = Persistence.createEntityManagerFactory("laba4");
//    private final EntityManager em = emf.createEntityManager();
    @PersistenceContext
    private EntityManager em;
    @Override
    public long create(Point point) {
        em.persist(point);
        return point.getId();
    }

    @Override
    public List<Point> getAll() {
        return em.createQuery("select p from Point p", Point.class).getResultList();
    }

    @Override
    public Point get(long id) {
        return em.find(Point.class, id);
    }
}
