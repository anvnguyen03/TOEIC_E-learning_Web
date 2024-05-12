package com.toeic.service.impl;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.toeic.entity.Question;
import com.toeic.entity.Test;
import com.toeic.repository.QuestionRepository;
import com.toeic.repository.TestRepository;
import com.toeic.service.QuestionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService{
	
	private final TestRepository testRepository;
	private final QuestionRepository questionRepository;
	
	public ResponseEntity<?> getQuestionsFromTestId(Long id) {
		Optional<Test> existedTest = testRepository.findById(id);
		if (existedTest.isEmpty()) {
			return new ResponseEntity<>("Không tìm thấy đề thi!", HttpStatus.NOT_FOUND);
		}
		
		Test test = existedTest.get();
		return new ResponseEntity<>(questionRepository.findByTest(test), HttpStatus.OK);
	}
	
	@Transactional
	public ResponseEntity<?> uploadQuestionsFromExcel(MultipartFile file, Long testId) throws EncryptedDocumentException, IOException {
		Workbook workbook = WorkbookFactory.create(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rowIterator = sheet.iterator();

        List<Question> questions = new ArrayList<>();

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            if (row.getRowNum() == 0) {
                // Bỏ qua dòng tiêu đề (nếu có)
                continue;
            }
            Question question = new Question();
            question.setContent(getStringValue(row.getCell(0)));
            question.setOptionA(getStringValue(row.getCell(1)));
            question.setOptionB(getStringValue(row.getCell(2)));
            question.setOptionC(getStringValue(row.getCell(3)));
            question.setOptionD(getStringValue(row.getCell(4)));
            question.setCorrectOption(getStringValue(row.getCell(5)));
            question.setImage(getStringValue(row.getCell(6)));
            question.setScript(getStringValue(row.getCell(7)));
            question.setAudio(getStringValue(row.getCell(8)));
            question.setExplaintation(getStringValue(row.getCell(9)));
            question.setOrderNumber((int) row.getCell(10).getNumericCellValue());
            question.setQuestionPassage(getStringValue(row.getCell(11)));
            question.setPart((int) row.getCell(12).getNumericCellValue());

            Test test = testRepository.findById(testId).orElseThrow();
            question.setTest(test);

            questions.add(question);
        }
        questionRepository.saveAll(questions);
        return new ResponseEntity<>("Upload file câu hỏi thành công!", HttpStatus.OK);
	}
	
	private String getStringValue(Cell cell) {
        if (cell != null) {
            // Kiểm tra kiểu dữ liệu của ô Excel
            if (cell.getCellType() == CellType.STRING) {
                return cell.getStringCellValue();
            } else if (cell.getCellType() == CellType.NUMERIC) {
                // Xử lý giá trị kiểu số
                return String.valueOf((int) cell.getNumericCellValue());
            }
        }
        return ""; // Trả về giá trị rỗng nếu ô là null hoặc không có giá trị
    }

	@Override
	public ResponseEntity<?> uploadQuestionsImages(List<MultipartFile> files, Long testId) {
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

	@Override
	public ResponseEntity<?> uploadQuestionsAudio(List<MultipartFile> files, Long testId) {
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
