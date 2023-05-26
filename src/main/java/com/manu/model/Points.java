package com.manu.model;

import com.manu.functions.LagrangeFunction;

import java.util.*;

public class Points {
    private ArrayList<Double> x;
    private ArrayList<Double> y;
    private Double desiredX;
    private LagrangeFunction lagrangeFunction;

    public Points() {
    }

    public Points(ArrayList<Double> x, ArrayList<Double> y, Double desiredX) {
        this.x = x;
        this.y = y;
        this.desiredX = desiredX;
    }

    public void sortDots() {
        ArrayList<Double> sortedX = new ArrayList<>(x);
        Collections.sort(sortedX);

        ArrayList<Double> sortedY = new ArrayList<>();
        for (Double sortedValue : sortedX) {
            int index = x.indexOf(sortedValue);
            sortedY.add(y.get(index));
        }

        x = sortedX;
        y = sortedY;
    }

    public void generateLagrangeFunction() {
        this.lagrangeFunction = new LagrangeFunction(this.x, this.y);
    }

    public boolean isValid() {
        return new HashSet<>(x).size() == x.size() && desiredX <= x.get(x.size() - 1) && desiredX >= x.get(0) && !x.contains(desiredX);
    }

    public ArrayList<Double> getX() {
        return x;
    }

    public void setX(ArrayList<Double> x) {
        this.x = x;
    }

    public ArrayList<Double> getY() {
        return y;
    }

    public void setY(ArrayList<Double> y) {
        this.y = y;
    }

    public Double getDesiredX() {
        return desiredX;
    }

    public void setDesiredX(Double desiredX) {
        this.desiredX = desiredX;
    }

    public LagrangeFunction getLagrangeFunction() {
        return lagrangeFunction;
    }

    @Override
    public String toString() {
        return "Points{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
