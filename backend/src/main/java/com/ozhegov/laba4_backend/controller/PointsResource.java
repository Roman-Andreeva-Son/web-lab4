package com.ozhegov.laba4_backend.controller;

import com.google.gson.Gson;
import com.ozhegov.laba4_backend.Util;
import com.ozhegov.laba4_backend.model.Point;
import com.ozhegov.laba4_backend.bean.PointsBean;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/points")
@Produces(MediaType.APPLICATION_JSON)
public class PointsResource {
    @Context
    private HttpServletRequest request;
    @Inject
    private PointsBean pointsBean;

    @GET
    public Response getPoints() {
        if(request.getSession().getAttribute("userId") == null)
            return Response.status(403).entity("You're not allowed for this resource").build();
        Gson gson = new Gson();
        String respBody = gson.toJson(pointsBean.getPoints());
        return Response.status(200).entity(respBody).build();
    }
    @POST
    public Response savePoint(@FormParam("x") String x, @FormParam("y") String y, @FormParam("r") String r){
        long startTime = System.nanoTime();

        if(request.getSession().getAttribute("userId") == null)
            return Response.status(403).entity("You're not allowed for this resource").build();
        if(x==null || y==null || r==null)
            return Response.status(400).entity("You have to pass all parameters").build();
        if(!Util.validatePointParameters(x,y,r))
            return Response.status(400).entity("Parameters have to be digits").build();

        Point storedPoint = pointsBean.storePoint(x, y, r, startTime);
        String json = new Gson().toJson(storedPoint);
        return Response.status(201).entity(json).build();
    }
}
