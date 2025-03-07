package com.ozhegov.laba4_backend.dao;

import com.ozhegov.laba4_backend.model.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.*;

import java.util.List;

@ApplicationScoped
public class UserDAO implements DAO<User>{
    @PersistenceContext
    private EntityManager em;
    @Override
    public long create(User user) {
        em.persist(user);
        return user.getId();
    }

    @Override
    public List<User> getAll() {
        return em.createQuery("select u from User u", User.class).getResultList();
    }

    @Override
    public User get(long id) {
        return em.find(User.class, id);
    }

    public User getByName(String name){
        TypedQuery<User> query = em.createQuery("select u from User u where u.name = :name", User.class);
        query.setParameter("name",name);

        List<User> userList = query.getResultList();

        if(userList.isEmpty())
            return null;
        return userList.get(0);
    }
}
