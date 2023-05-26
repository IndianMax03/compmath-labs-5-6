package com.manu.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.manu.model.Points;
import com.manu.solvers.Solver;
import org.springframework.stereotype.Component;

@Component
public class InterpolationService {

    public ObjectNode solve(Points points) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        points.sortDots();
        points.generateLagrangeFunction();
        if (!points.isValid()) {
            node.put("error", "Переданы невалидные данные. X должны быть уникальными. Искомый X должен находиться внутри отрезка интерполирования и не должен быть равен прочим X.");
            return node;
        }
        Solver solver = new Solver(points);
        solver.solve();
        node.putPOJO("x", solver.getDataX());
        node.putPOJO("y", solver.getDataY());
        node.putPOJO("y", solver.getDataY());
        node.putPOJO("lX", solver.getLagrangeX());
        node.putPOJO("lY", solver.getLagrangeY());
        node.putPOJO("desiredX", solver.getDesiredX());
        node.putPOJO("desiredY", solver.getDesiredY());
        return node;
    }

}
