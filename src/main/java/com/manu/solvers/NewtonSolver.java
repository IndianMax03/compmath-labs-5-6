package com.manu.solvers;

import com.manu.model.Points;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class NewtonSolver extends InterpolationSolver {

    private final ArrayList<Double> dataY;

    private final Map<String, ArrayList<Double>> finiteDifferences = new HashMap<>();

    public NewtonSolver(Points points) {
        super(points);
        this.dataY = points.getY();
    }

    @Override
    public void solve() {
        fillFiniteDifferences();
        points.generateNewtonFunction(finiteDifferences);

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
            interpolatedY.add(points.getNewtonFunction().f(x));
        }


        this.desiredY = points.getNewtonFunction().f(desiredX);
    }

    private void fillFiniteDifferences() {
        for (int i = 0; i < dataY.size(); i++) {

            finiteDifferences.put("d" + i, new ArrayList<>());
            ArrayList<Double> currentDifferences = finiteDifferences.get("d" + i);

            if (i == 0) {
                currentDifferences.addAll(dataY);
            } else {
                ArrayList<Double> prevDifferences = finiteDifferences.get("d" + (i - 1));
                for (int j = 0; j < prevDifferences.size() - 1; j++) {
                    double cur = prevDifferences.get(j);
                    double next = prevDifferences.get(j + 1);
                    currentDifferences.add(next - cur);
                }

            }
        }
    }


    public ArrayList<Double> getDataY() {
        return dataY;
    }

    public Map<String, ArrayList<Double>> getFiniteDifferences() {
        return finiteDifferences;
    }
}
