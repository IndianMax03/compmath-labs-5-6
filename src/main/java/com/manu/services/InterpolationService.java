package com.manu.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.manu.model.Points;
import com.manu.solvers.LagrangeSolver;
import com.manu.solvers.NewtonSolver;
import org.springframework.stereotype.Component;

@Component
public class InterpolationService {

    public ObjectNode solve(Points points) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();

        points.sortDots();
        points.generateLagrangeFunction();

        if (!points.isValid()) {
            node.put("error", "Переданы невалидные данные: проверьте, что искомый икс находится внутри отрезка, и что он не равен прочим узлам. Точки должны быть равноотстоящими.");
            return node;
        }

        LagrangeSolver lagrangeSolver = new LagrangeSolver(points);
        lagrangeSolver.solve();
        NewtonSolver newtonSolver = new NewtonSolver(points);
        newtonSolver.solve();

        node.putPOJO("x", points.getX());
        node.putPOJO("y", points.getY());
        node.putPOJO("desiredX", points.getDesiredX());
        node.putPOJO("lX", lagrangeSolver.getInterpolatedX());
        node.putPOJO("lY", lagrangeSolver.getInterpolatedY());
        node.putPOJO("lagrangeDesiredY", lagrangeSolver.getDesiredY());
        node.putPOJO("nX", newtonSolver.getInterpolatedX());
        node.putPOJO("nY", newtonSolver.getInterpolatedY());
        node.putPOJO("finiteDifferences", newtonSolver.getFiniteDifferences());
        node.putPOJO("newtonDesiredY", newtonSolver.getDesiredY());


        return node;
    }

}
