package com.ozhegov.laba4_backend.controller;

import com.ozhegov.laba4_backend.exceptions.UserAlreadyExistsException;
import com.ozhegov.laba4_backend.model.User;
import com.ozhegov.laba4_backend.bean.AuthenticationBean;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Path("/register")
@Produces(MediaType.APPLICATION_JSON)
public class RegisterResource {
    @Context
    private HttpServletRequest request;
    @Inject
    private AuthenticationBean authenticationBean;

    @POST
    public Response register(@FormParam("name") String name, @FormParam("password") String password) {
        try{
            HttpSession session = request.getSession();

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] bytes = md.digest(password.getBytes());
            password = bytesToHex(bytes);

            User user = new User(name, password);
            authenticationBean.register(user, session);

            return Response.ok("User was registered successfully").build();
        }catch(UserAlreadyExistsException e) {
            return Response.status(409).entity("User like this is already exists").build();
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