package com.toeic.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.toeic.dto.response.TestResponse;
import com.toeic.entity.Test;
import com.toeic.service.TestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/tests")
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
@RequiredArgsConstructor
public class TestController {
	private final TestService testService;
	@GetMapping({"/", ""})
	public ResponseEntity<List<TestResponse>> getAll(@RequestParam Optional<String> title, 
			@RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) {
		return ResponseEntity.ok(testService.getAll(title.orElse(""), page.orElse(0), size.orElse(10)));
	}
	
	@GetMapping("/category/{catename}")
	public ResponseEntity<List<TestResponse>> getByCategory(@PathVariable("catename") Optional<String> catename,
			@RequestParam Optional<String> title, 
			@RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) {
		return ResponseEntity.ok(testService.getByCategory(catename.orElse(""), title.orElse(""),
				page.orElse(0), size.orElse(10)));
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<String> getById(@PathVariable("id") Optional<Long> id) {
		return ResponseEntity.ok(id.toString());
	}
}