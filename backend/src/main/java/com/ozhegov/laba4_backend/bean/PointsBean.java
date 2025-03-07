package com.ozhegov.laba4_backend.bean;

import com.ozhegov.laba4_backend.dao.PointDAO;
import com.ozhegov.laba4_backend.model.Point;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;

import java.util.List;

@Stateless
public class PointsBean {
    @Inject
    private PointDAO pointDAO;

    public List<Point> getPoints(){
        return pointDAO.getAll();
    }

    public Point storePoint(String strX, String strY, String strR, long startTime){
        double x = Double.parseDouble(strX);
        double y = Double.parseDouble(strY);
        double r = Double.parseDouble(strR);

        Point point = new Point(x, y, r);
        if(isIntoArea(x,y,r))
            point.setResult("попал");
        else
            point.setResult("не попал");
        point.setExecutionTime(System.nanoTime() - startTime);

        pointDAO.create(point);
        return point;
    }

    public boolean isIntoArea(double x, double y, double r){
        double line = y + 2*x - r;
        double circle = Math.pow(x, 2) + Math.pow(y, 2) - Math.pow(r, 2);

        return ((x <= 0 && y >= 0 && x >= -r/2 && y <= r) || (x >= 0 && y >= 0 && line <= 0) || (x <= 0 && y <=0 && circle <= 0));
    }
}
