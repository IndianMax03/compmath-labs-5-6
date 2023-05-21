package com.manu.listening;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@org.springframework.stereotype.Controller
public class Controller {

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

}
