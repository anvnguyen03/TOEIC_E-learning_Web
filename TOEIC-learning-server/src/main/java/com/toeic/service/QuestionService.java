package com.toeic.service;

import java.io.IOException;

import org.apache.poi.EncryptedDocumentException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface QuestionService {
	ResponseEntity<?> uploadQuestionsFromExcel(MultipartFile file, Long testId) 
			throws EncryptedDocumentException, IOException;
	ResponseEntity<?> getQuestionsFromTestId(Long id);
}
