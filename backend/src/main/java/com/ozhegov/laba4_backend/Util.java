package com.ozhegov.laba4_backend;

public class Util {
    public static boolean validatePointParameters(String x, String y, String r){
        try{
            Double.parseDouble(x);
            Double.parseDouble(y);
            Double.parseDouble(r);

            return true;
        }catch(NumberFormatException e){
            return false;
        }
    }
}
