package com.toeic.controller.admin;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.EncryptedDocumentException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.toeic.entity.Test;
import com.toeic.repository.TestRepository;
import com.toeic.service.QuestionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
@RequiredArgsConstructor
public class AdminQuestionController {

	private final QuestionService questionService;
	
	private final TestRepository testRepository;
	
	@GetMapping("/question/by-test/{testId}")
	public ResponseEntity<?> getQuestionsByTest(@PathVariable Long testId) {
		return questionService.getQuestionsFromTestId(testId);
	}
	
	@PostMapping("/question/upload-excel")
	public ResponseEntity<?> uploadQuestionsFromExcel(
			@RequestParam("file") MultipartFile file,
            @RequestParam("testId") Long testId) throws EncryptedDocumentException, IOException {
		if (file == null || file.isEmpty()) {
			return new ResponseEntity<>("Vui lòng chọn file upload", HttpStatus.BAD_REQUEST);
		}
		
		return questionService.uploadQuestionsFromExcel(file, testId);
	}

	@PostMapping("/question/upload-image")
    public ResponseEntity<?> uploadExamQuestionImages(
            @RequestParam("image") List<MultipartFile> files,
            @RequestParam("testId") Long testId ) {
        if (files == null || files.isEmpty()) {
            return new ResponseEntity<>("Vui lòng chọn ảnh để upload.", HttpStatus.BAD_REQUEST);
        }
        try {
            // Đường dẫn thư mục tĩnh cho ảnh
        	Test test = testRepository.findById(testId).orElseThrow();
            String imagePath = test.getTestTitle().toString();
            Path uploadImagePath = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", "images", imagePath);

            if (!Files.exists(uploadImagePath)) {
                Files.createDirectories(uploadImagePath);
            }
            List<String> imageNames = new ArrayList<>();

            for (MultipartFile file : files) {
                String imageName = file.getOriginalFilename();
                Path imageFile = uploadImagePath.resolve(imageName);

                try (OutputStream osImage = Files.newOutputStream(imageFile)) {
                    osImage.write(file.getBytes());
                }
                imageNames.add(imageName);
            }

            return ResponseEntity.ok("Ảnh upload thành công: " + String.join(", ", imageNames));
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi khi upload ảnh: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/question/upload-audio")
    public ResponseEntity<?> uploadExamQuestionAudios(
            @RequestParam("audio") List<MultipartFile> files,
            @RequestParam("testId") Long testId ) {
        if (files == null || files.isEmpty()) {
            return new ResponseEntity<>("Vui lòng chọn audio để upload", HttpStatus.BAD_REQUEST);
        }

        try {
            // Đường dẫn thư mục tĩnh cho âm thanh
        	Test test = testRepository.findById(testId).orElseThrow();
            String audioPath = test.getTestTitle().toString();
            Path uploadAudioPath = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", "audios", audioPath);

            if (!Files.exists(uploadAudioPath)) {
                Files.createDirectories(uploadAudioPath);
            }

            List<String> audioNames = new ArrayList<>();

            for (MultipartFile file : files) {
                String audioName = file.getOriginalFilename();
                Path audioFile = uploadAudioPath.resolve(audioName);

                try (OutputStream osAudio = Files.newOutputStream(audioFile)) {
                    osAudio.write(file.getBytes());
                }
                audioNames.add(audioName);
            }

            return ResponseEntity.ok("Upload audio thành công: " + String.join(", ", audioNames));
        } catch (Exception e) {
            return new ResponseEntity<>("Upload audio thất bại: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
}
