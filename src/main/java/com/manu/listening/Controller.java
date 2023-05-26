package com.manu.listening;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.manu.model.Points;
import com.manu.services.InterpolationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@org.springframework.stereotype.Controller
public class Controller {

    private final InterpolationService interpolationService;

    @Autowired
    public Controller(InterpolationService interpolationService) {
        this.interpolationService = interpolationService;
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("lab5")
    public String lab5() {
        return "lab5";
    }

    @GetMapping("lab6")
    public String lab6() {
        return "lab6";
    }

    @PostMapping("lab5/interpolation/solve")
    @ResponseBody
    public ObjectNode solve(@RequestBody Points points) {
        return interpolationService.solve(points);
    }

}
