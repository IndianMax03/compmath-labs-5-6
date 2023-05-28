package com.manu.lab5.functions;

import java.util.ArrayList;
import java.util.Map;

public class NewtonFunction implements InterpolationFunction {

    private final ArrayList<Double> x;
    private final ArrayList<Double> y;
    private final int N;
    private double t;
    private final int ROUNDING_COEFFICIENT = 1000000;
    private int interpolationStartIndex = 0;
    private final Map<String, ArrayList<Double>> finiteDifferences;
    private boolean isBack;

    public NewtonFunction(ArrayList<Double> x, ArrayList<Double> y, Map<String, ArrayList<Double>> finiteDifferences) {
        this.x = x;
        this.y = y;
        this.N = x.size();
        this.finiteDifferences = finiteDifferences;
    }

    @Override
    public double f(Double value) {

        double mid = (x.get(x.size() - 1) + x.get(0)) / 2;
        double step = (double) Math.round((x.get(1) - x.get(0)) * ROUNDING_COEFFICIENT) / ROUNDING_COEFFICIENT;

        this.isBack = value > mid;

        calculateInterpolationStartIndex(value);
        calculateTValue(step, value);

        double answer = 0d;

        if (!isBack) {
            for (int i = 0; i < N - interpolationStartIndex; i++) {

                if (i == 0) {
                    answer += finiteDifferences.get("d" + i).get(interpolationStartIndex);
                } else {

                    double tFactor = 1;
                    tFactor /= factorial(i);
                    for (int j = 0; j < i; j++) {
                        tFactor *= t - j;
                    }
                    answer += tFactor * finiteDifferences.get("d" + i).get(interpolationStartIndex);

                }

            }
        } else {

            for (int i = 0; i <= interpolationStartIndex; i++) {

                if (i == 0) {
                    answer += finiteDifferences.get("d" + i).get(interpolationStartIndex);
                } else {

                    double tFactor = 1;
                    tFactor /= factorial(i);
                    for (int j = 0; j < i; j++) {
                        tFactor *= t + j;
                    }
                    answer += tFactor * finiteDifferences.get("d" + i).get(interpolationStartIndex - i);

                }

            }

        }

        return answer;
    }

    private void calculateInterpolationStartIndex(double value) {

        for (int i = 0; i < x.size() - 1; i++) {
            double cur = x.get(i);
            double next = x.get(i + 1);
            if (value > cur && value < next) {
                interpolationStartIndex = isBack ? i + 1 : i;
            }
        }

    }

    private void calculateTValue(double h, double value) {
        this.t = (value - x.get(interpolationStartIndex)) / h;
    }

    public long factorial(int n) {
        long fact = 1;
        for (int i = 2; i <= n; i++) {
            fact = fact * i;
        }
        return fact;
    }
}
