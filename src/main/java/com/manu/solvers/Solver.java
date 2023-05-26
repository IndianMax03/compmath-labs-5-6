package com.manu.solvers;

import com.manu.model.Points;

import java.util.ArrayList;

public class Solver {

    private final Points points;
    private final ArrayList<Double> dataX;
    private final ArrayList<Double> dataY;
    private final Double desiredX;
    private final ArrayList<Double> lagrangeX = new ArrayList<>(); //  иксы многочлена Лагранжа
    private final ArrayList<Double> lagrangeY = new ArrayList<>(); //  игреки многочлена Лагранжа
    private final int N = 50; //  количество точек для построения многочленов
    private Double desiredY;

    public Solver(Points points) {
        this.points = points;
        this.dataX = points.getX();
        this.dataY = points.getY();
        this.desiredX = points.getDesiredX();
    }

    public void solve() { //  todo: ньютон + фронт
        final int size = dataX.size();
        double start = dataX.get(0);
        double end = dataX.get(size - 1);
        double step = (end - start) / (N - 1);

        for (int i = 0; i < N; i ++) {
            double curX = start + i * step;
            lagrangeX.add(curX);
            lagrangeY.add(points.getLagrangeFunction().f(curX));
        }

        this.desiredY = points.getLagrangeFunction().f(desiredX);
    }

    public ArrayList<Double> getDataX() {
        return dataX;
    }

    public ArrayList<Double> getDataY() {
        return dataY;
    }

    public Double getDesiredX() {
        return desiredX;
    }

    public ArrayList<Double> getLagrangeX() {
        return lagrangeX;
    }

    public ArrayList<Double> getLagrangeY() {
        return lagrangeY;
    }

    public Double getDesiredY() {
        return desiredY;
    }
}
