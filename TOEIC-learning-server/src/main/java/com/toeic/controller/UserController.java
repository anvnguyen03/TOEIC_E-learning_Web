package com.toeic.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toeic.entity.User;
import com.toeic.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
@RequiredArgsConstructor
public class UserController {
	@Autowired
	private UserService userService;
	private final PasswordEncoder passwordEncoder;

	@GetMapping
	public ResponseEntity<String> sayHello() {
		return ResponseEntity.ok("Hi user");
	}

	@GetMapping("/current")
	public User getUserInfo() {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		System.out.println(email);
		return userService.findByUserEmail(email);
	}

	@PutMapping("/change-info")
	public ResponseEntity<User> changeProfile(@RequestBody Map<String, String> request) {
	    String email = SecurityContextHolder.getContext().getAuthentication().getName();
	    User currentUser = userService.findByUserEmail(email);
	    
	    // Extract newFullname and newPassword from the request body
	    String newFullname = request.get("newFullname");
	    String newPassword = request.get("newPassword");

	    if (newFullname != null && !newFullname.equals(currentUser.getFullname())) {
	        currentUser.setFullname(newFullname);
	    }
	    if (newPassword != null) {
	        currentUser.setPassword(passwordEncoder.encode(newPassword));
	    }
	    System.out.println(newPassword);
	    userService.update(currentUser);
	    return ResponseEntity.ok(currentUser);
	}
}
