package com.ozhegov.laba4_backend.controller;

import com.ozhegov.laba4_backend.exceptions.IncorrectPasswordOrNameException;
import com.ozhegov.laba4_backend.model.User;
import com.ozhegov.laba4_backend.bean.AuthenticationBean;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Path("/login")
@Produces(MediaType.TEXT_HTML)
@ApplicationScoped
public class LoginResource {
    @Context
    private HttpServletRequest request;
    @Inject
    private AuthenticationBean authenticationBean;
    @POST
    public Response login(@FormParam("name") String name, @FormParam("password") String password) {
        try{
            HttpSession session = request.getSession();
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] bytes = md.digest(password.getBytes());
            password = bytesToHex(bytes);
            User user = new User(name, password);

            authenticationBean.login(user, session);
            return Response.ok("User's logged in").build();
        }catch (IncorrectPasswordOrNameException e){
            return Response.status(403,"Incorrect password or name").build();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private String bytesToHex(byte[] bytes){
        StringBuilder sb = new StringBuilder();
        for(byte b: bytes){
            sb.append(String.format("%02x",b));
        }
        return sb.toString();
    }
}
