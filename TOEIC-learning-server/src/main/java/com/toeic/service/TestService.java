package com.toeic.service;


import org.springframework.http.ResponseEntity;

import com.toeic.dto.TestDto;

public interface TestService {
	ResponseEntity<?> getAll(String title, int page, int size);
	ResponseEntity<?> getByCategory(String catename, String title,int page, int size);
	ResponseEntity<?> getById(long id);
	ResponseEntity<?> createTest(TestDto testDto);
	ResponseEntity<?> updateTest(TestDto testDto);
	ResponseEntity<?> deleteTest(TestDto testDto);
	ResponseEntity<?> getAllNoPagin();
	ResponseEntity<?> changeStatus(long id);
}
