package com.ozhegov.laba4_backend.dao;

import com.ozhegov.laba4_backend.exceptions.UserAlreadyExistsException;

import java.util.List;

public interface DAO<T>{
    long create(T t) throws UserAlreadyExistsException;
    List<T> getAll();
    T get(long id);
}
