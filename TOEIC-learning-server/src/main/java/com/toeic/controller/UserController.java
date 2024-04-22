package com.toeic.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
public class UserController {
	
	@GetMapping
	public ResponseEntity<String> sayHello() {
		return ResponseEntity.ok("Hi user");
	}
}
