package com.manu.lab6.methods;

import com.manu.lab6.model.SdeData;

public class ModifiedEulerMethod extends OneStepMethod {

    public ModifiedEulerMethod(SdeData data) {
        super(data, 2);
    }

    @Override
    protected Double calculateAndCheckByRunge(int index) {
        double xH = xArray.get(index-1) + H;
        double xHdiv2 = xArray.get(index-1) + H/2;
        double prevY = yArray.get(index-1);
        double prevX = xArray.get(index-1);
        double yH = prevY + H/2 * (sdeEquation.dy(prevX, prevY) + sdeEquation.dy(xH, prevY + H * sdeEquation.dy(prevX, prevY)));
        double yHdiv2 = prevY + H/4 * (sdeEquation.dy(prevX, prevY) + sdeEquation.dy(xHdiv2, prevY + H/2 * sdeEquation.dy(prevX, prevY)));
        if (Math.abs((yH - yHdiv2) / (Math.pow(2, ACCURACY_ORDER) - 1)) <= EPSILON) {
            xArray.add(xH);
            yArray.add(yH);
            return xH;
        } else {
            H /= 2;
            return null;
        }
    }

}
