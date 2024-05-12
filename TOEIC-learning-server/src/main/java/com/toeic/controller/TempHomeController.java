package com.toeic.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TempHomeController {
	
	@GetMapping("/helloworld")
	public String getAllTests() {
		return "nhìn nhìn cái 10 ngìn";
	}
	@GetMapping("/api/helloworld")
    public String helloWorld() {
        return "Hello from Spring Boot!";
    }
}
