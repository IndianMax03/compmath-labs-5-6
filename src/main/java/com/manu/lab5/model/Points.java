package com.manu.lab5.model;

import com.manu.lab5.functions.LagrangeFunction;
import com.manu.lab5.functions.NewtonFunction;

import java.util.*;

public class Points {
    private ArrayList<Double> x;
    private ArrayList<Double> y;
    private Double desiredX;
    private LagrangeFunction lagrangeFunction;
    private NewtonFunction newtonFunction;

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

    public void generateNewtonFunction(Map<String, ArrayList<Double>> finiteDifferences) {
        this.newtonFunction = new NewtonFunction(this.x, this.y, finiteDifferences);
    }

    public boolean isValid() {

        boolean validIntervals = true;

        double step = Math.abs(x.get(1) - x.get(0));
        final double epsilon = 1e-10;

        if (x.size() != 2) {

            for (int i = 2; i < x.size(); i++) {
                double cur = x.get(i);
                double prev = x.get(i-1);
                double curStep = Math.abs(cur - prev);
                if (Math.abs(curStep - step) > epsilon) {
                    validIntervals = false;
                }
            }

        }

        return new HashSet<>(x).size() == x.size() && validIntervals && desiredX <= x.get(x.size() - 1) && desiredX >= x.get(0) && !x.contains(desiredX);
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
    public NewtonFunction getNewtonFunction() {
        return newtonFunction;
    }

    @Override
    public String toString() {
        return "Points{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
