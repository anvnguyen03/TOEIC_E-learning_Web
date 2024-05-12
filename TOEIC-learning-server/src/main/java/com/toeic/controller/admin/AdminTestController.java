package com.toeic.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toeic.dto.TestDto;
import com.toeic.service.TestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
@RequiredArgsConstructor
public class AdminTestController {
	
	private final TestService testService;
	
	@PostMapping("/test/new")
	public ResponseEntity<?> createTest(@RequestBody TestDto testDto) {
		return testService.createTest(testDto);
	}
	
	@PostMapping("/test/update")
	public ResponseEntity<?> updateTest(@RequestBody TestDto testDto) {
		return testService.updateTest(testDto);
	}
	
	@PostMapping("/test/delete")
	public ResponseEntity<?> deleteTest(@RequestBody TestDto testDto) {
		return testService.deleteTest(testDto);
	}
}
