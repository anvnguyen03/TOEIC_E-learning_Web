package com.toeic.service;

import java.io.IOException;
import java.util.List;

import org.apache.poi.EncryptedDocumentException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface QuestionService {
	ResponseEntity<?> uploadQuestionsFromExcel(MultipartFile file, Long testId) 
			throws EncryptedDocumentException, IOException;
	ResponseEntity<?> getQuestionsFromTestId(Long id);
	ResponseEntity<?> uploadQuestionsImages(List<MultipartFile> files, Long testId);
	ResponseEntity<?> uploadQuestionsAudio(List<MultipartFile> files, Long testId);
}
