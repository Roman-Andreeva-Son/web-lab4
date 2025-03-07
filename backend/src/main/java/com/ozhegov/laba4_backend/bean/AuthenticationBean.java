package com.ozhegov.laba4_backend.bean;

import com.ozhegov.laba4_backend.dao.UserDAO;
import com.ozhegov.laba4_backend.exceptions.IncorrectPasswordOrNameException;
import com.ozhegov.laba4_backend.exceptions.UserAlreadyExistsException;
import com.ozhegov.laba4_backend.model.User;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpSession;


@Stateless
public class AuthenticationBean {
    @Inject
    private UserDAO userDAO;


    public void register(User user, HttpSession session) throws UserAlreadyExistsException {
        if(userDAO.getByName(user.getName())!=null)
            throw new UserAlreadyExistsException();

        userDAO.create(user);
        session.setMaxInactiveInterval(90);
        session.setAttribute("userId",user.getId());
    }

    public void login(User user, HttpSession session) throws IncorrectPasswordOrNameException {
        if(session.getAttribute("userId") != null)
            return;

        User userFromDB = userDAO.getByName(user.getName());
        if (userFromDB == null || !user.getPassword().equals(userFromDB.getPassword()))
            throw new IncorrectPasswordOrNameException();
        session.setAttribute("userId",userFromDB.getId());
        session.setMaxInactiveInterval(90);
    }
}
