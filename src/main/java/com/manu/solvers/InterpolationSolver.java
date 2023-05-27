package com.manu.solvers;

import com.manu.model.Points;

import java.util.ArrayList;

public abstract class InterpolationSolver {

    protected final Points points;
    protected final ArrayList<Double> dataX;
    protected final Double desiredX;
    protected final ArrayList<Double> interpolatedX = new ArrayList<>();
    protected final ArrayList<Double> interpolatedY = new ArrayList<>();

    protected final int N;
    protected Double desiredY;

    public InterpolationSolver(Points points) {
        this.points = points;
        this.dataX = points.getX();
        this.N = dataX.size() * 2;
        this.desiredX = points.getDesiredX();
    }

    public abstract void solve();

    public ArrayList<Double> getInterpolatedX() {
        return interpolatedX;
    }

    public ArrayList<Double> getInterpolatedY() {
        return interpolatedY;
    }

    public Double getDesiredY() {
        return desiredY;
    }
}
