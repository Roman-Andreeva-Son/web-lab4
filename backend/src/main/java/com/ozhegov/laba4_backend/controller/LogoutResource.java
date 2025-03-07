package com.ozhegov.laba4_backend.controller;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;

@Path("/logout")
@ApplicationScoped
public class LogoutResource {
    @Context
    private HttpServletRequest request;

    @GET
    public Response logout(){
        try {
            HttpSession session = request.getSession();
            session.invalidate();
            return Response.ok().build();
        }catch(IllegalStateException e) {
            return Response.status(400).entity("Сессия уже неактивна").build();
        }
    }
}
