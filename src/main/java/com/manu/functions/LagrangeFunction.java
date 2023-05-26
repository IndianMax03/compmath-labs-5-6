package com.manu.functions;

import java.util.ArrayList;

public class LagrangeFunction {

    private final ArrayList<Double> x;
    private final ArrayList<Double> y;
    private final int N;

    public LagrangeFunction(ArrayList<Double> x, ArrayList<Double> y) {
        this.x = x;
        this.y = y;
        this.N = x.size();
    }

    public Double f(Double value) {
        double answer = 0d;

        for (int i = 0; i < N; i++) {
            double curValue = y.get(i);
            for (int j = 0; j < N; j++) {
                if (j != i) {
                    curValue *= (value - x.get(j));
                    curValue /= (x.get(i) - x.get(j));
                }
            }
            answer += curValue;
        }

        return answer;
    }

}