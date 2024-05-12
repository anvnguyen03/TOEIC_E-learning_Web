package com.toeic.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.toeic.dto.TestDto;
import com.toeic.dto.response.TestResponse;
import com.toeic.entity.Test;
import com.toeic.entity.TestCategory;
import com.toeic.entity.TestStatus;
import com.toeic.mapper.TestResponseConverter;
import com.toeic.repository.TestCategoryRepository;
import com.toeic.repository.TestRepository;
import com.toeic.service.TestService;

import lombok.RequiredArgsConstructor;

import static org.springframework.data.domain.PageRequest.of;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService{

	private final TestRepository testRepository;
	private final TestCategoryRepository testCateoryRepository;
	@Override
	public ResponseEntity<?> getAll(String title, int page, int size) {
		Page<Test> listTest = testRepository.findByTestTitleContaining(title, of(page, size));
		int totalPages = listTest.getTotalPages();
		List<TestResponse> listTestResponses = TestResponseConverter.convertFromListTest(listTest.getContent(), totalPages);
		return new ResponseEntity<>(listTestResponses, HttpStatus.OK);
	}
	@Override
	public ResponseEntity<?> getByCategory(String catename, String title, int page, int size) {
		Page<Test> listTest = testRepository.findByTestCategory_CateNameAndTestTitleContaining(catename, title, of(page, size));
		int totalPages = listTest.getTotalPages();
		List<TestResponse> listTestResponses = TestResponseConverter.convertFromListTest(listTest.getContent(), totalPages);
		return new ResponseEntity<>(listTestResponses, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getById(long id) {
		Optional<Test> test = testRepository.findById(id);
		if (test.isPresent()) {
			return new ResponseEntity<>(test, HttpStatus.OK);	
		} else {
			return new ResponseEntity<>("Không tìm thấy đề thi!", HttpStatus.NOT_FOUND);	
		}
	}

	@Transactional
	public ResponseEntity<?> createTest(TestDto testDto) {
		Optional<Test> existedTest = testRepository.findByTestTitle(testDto.getTestTitle());
		if (existedTest.isPresent()) {
			return new ResponseEntity<>("Đề thi đã tồn tại!", HttpStatus.BAD_REQUEST);
		} 
		TestCategory testCate = testCateoryRepository.findById(testDto.getCategoryId()).orElseThrow();
		Test test = new Test(testDto.getTestTitle(), 1, testCate);
		testRepository.save(test);
		return new ResponseEntity<>(test, HttpStatus.CREATED);
	}
	
	@Transactional
	public ResponseEntity<?> updateTest(TestDto testDto) {
		Optional<Test> existedTest = testRepository.findById(testDto.getId());
		if (existedTest.isPresent()) {
			Test updatingTest = existedTest.get();
			updatingTest.setTestTitle(testDto.getTestTitle());
			TestCategory testCate = testCateoryRepository.findById(testDto.getCategoryId()).orElseThrow();
			updatingTest.setTestCategory(testCate);
			updatingTest.setDuration(testCate.getDuration());
			updatingTest.setUpdatedAt(new Date());
			testRepository.save(updatingTest);
			
			return new ResponseEntity<>(updatingTest, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Không tìm thấy đề thi!", HttpStatus.NOT_FOUND);
		}
	}
	
	@Transactional
	public ResponseEntity<?> deleteTest(TestDto testDto) {
		Optional<Test> existedTest = testRepository.findById(testDto.getId());
		if (existedTest.isPresent()) {
			Test updatingTest = existedTest.get();
			updatingTest.setStatus(TestStatus.DELETED);
			testRepository.save(updatingTest);
			
			return new ResponseEntity<>(updatingTest, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Không tìm thấy đề thi!", HttpStatus.NOT_FOUND);
		}
	}
}
