package com.toeic.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.toeic.dto.response.TestResponse;
import com.toeic.entity.Test;
import com.toeic.mapper.TestResponseConverter;
import com.toeic.repository.TestRepository;
import com.toeic.service.TestService;

import lombok.RequiredArgsConstructor;

import static org.springframework.data.domain.PageRequest.of;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService{

	private final TestRepository testRepository;
	@Override
	public List<TestResponse> getAll(String title, int page, int size) {
		Page<Test> listTest = testRepository.findByTestTitleContaining(title, of(page, size));
		int totalPages = listTest.getTotalPages();
		List<TestResponse> listTestResponses = TestResponseConverter.convertFromListTest(listTest.getContent(), totalPages);
		return listTestResponses;
	}
	@Override
	public List<TestResponse> getByCategory(String catename, String title, int page, int size) {
		Page<Test> listTest = testRepository.findByTestCategory_CateNameAndTestTitleContaining(catename, title, of(page, size));
		int totalPages = listTest.getTotalPages();
		List<TestResponse> listTestResponses = TestResponseConverter.convertFromListTest(listTest.getContent(), totalPages);
		return listTestResponses;
	}

}
