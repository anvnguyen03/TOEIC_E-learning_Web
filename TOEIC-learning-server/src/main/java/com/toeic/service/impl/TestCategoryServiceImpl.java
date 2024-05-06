package com.toeic.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.toeic.entity.TestCategory;
import com.toeic.repository.TestCategoryRepository;
import com.toeic.service.TestCategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestCategoryServiceImpl implements TestCategoryService{
	
	private final TestCategoryRepository testCategoryRepository;
	@Override
	public List<TestCategory> getAll() {
		return testCategoryRepository.findAll();
	}
}
