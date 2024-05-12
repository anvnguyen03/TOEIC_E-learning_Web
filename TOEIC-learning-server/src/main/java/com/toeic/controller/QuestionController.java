package com.toeic.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toeic.service.QuestionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/questions")
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
@RequiredArgsConstructor
public class QuestionController {

	private final QuestionService questionService;
	
	@GetMapping("/{id}")
    public ResponseEntity<?> getQuestionsByTestId(@PathVariable long id) {
        return questionService.getQuestionsFromTestId(id);
    }
}
