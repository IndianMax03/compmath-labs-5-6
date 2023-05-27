package com.manu.solvers;

import com.manu.model.Points;

import java.util.Collections;

public class LagrangeSolver extends InterpolationSolver{

    public LagrangeSolver(Points points) {
        super(points);
    }

    @Override
    public void solve() {
        final int size = dataX.size();
        double start = dataX.get(0);
        double end = dataX.get(size - 1);
        double step = (end - start) / (N - 1);

        interpolatedX.addAll(points.getX());
        interpolatedX.add(desiredX);
        interpolatedX.remove(0);
        interpolatedX.remove(interpolatedX.size() - 1);
        interpolatedX.remove(interpolatedX.size() - 1);

        for (int i = 0; i < N; i ++) {
            double curX = start + i * step;
            interpolatedX.add(curX);
        }

        Collections.sort(interpolatedX);

        for (Double x : interpolatedX) {
            interpolatedY.add(points.getLagrangeFunction().f(x));
        }

        this.desiredY = points.getLagrangeFunction().f(desiredX);
    }

}
