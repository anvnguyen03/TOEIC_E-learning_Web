package com.toeic.service.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.toeic.service.TestHistoryService;

@Service
public class TestHistoryServiceImpl implements TestHistoryService{

	@Transactional
	public ResponseEntity<?> createTestHistory() {
		return null;
	}
}
