package com.manu.lab6.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.manu.lab6.methods.MilneMethod;
import com.manu.lab6.methods.ModifiedEulerMethod;
import com.manu.lab6.methods.RungeKuttaMethod;
import com.manu.lab6.model.SdeData;
import org.springframework.stereotype.Component;

@Component
public class CauchyService {

    public ObjectNode solve(SdeData data) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        if (!data.isValidData()) {
            node.put("error", "Got invalid data");
            return node;
        }

        data.validateData();

        ModifiedEulerMethod modifiedEulerMethod = new ModifiedEulerMethod(data);
        modifiedEulerMethod.solve();
        RungeKuttaMethod rungeKuttaMethod = new RungeKuttaMethod(data);
        rungeKuttaMethod.solve();
        try {
            MilneMethod milneMethod = new MilneMethod(data);
            milneMethod.solve();
            node.putPOJO("milneX", milneMethod.getxArray());
            node.putPOJO("milneY", milneMethod.getyArray());
            node.putPOJO("milneExpectedY", milneMethod.getyExpectedArray());
        } catch (NullPointerException | IndexOutOfBoundsException e) {
            node.put("error", "Метод Милна не работает, потому что метод Рунге-Кутта не может определить начальное приближение.");
        }


        node.putPOJO("eulerX", modifiedEulerMethod.getxArray());
        node.putPOJO("eulerY", modifiedEulerMethod.getyArray());
        node.putPOJO("eulerExpectedY", modifiedEulerMethod.getyExpectedArray());
        node.putPOJO("rungeKuttaX", rungeKuttaMethod.getxArray());
        node.putPOJO("rungeKuttaY", rungeKuttaMethod.getyArray());
        node.putPOJO("rungeKuttaExpectedY", rungeKuttaMethod.getyExpectedArray());

        return node;
    }

}
