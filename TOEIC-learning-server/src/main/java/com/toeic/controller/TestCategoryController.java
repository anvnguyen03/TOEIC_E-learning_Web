package com.toeic.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toeic.entity.TestCategory;
import com.toeic.service.TestCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/test-categories")
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
@RequiredArgsConstructor
public class TestCategoryController {
	private final TestCategoryService testCategoryService;
	
	@GetMapping("")
	public ResponseEntity<List<TestCategory>> getAll() {
		return ResponseEntity.ok(testCategoryService.getAll());
	}
}