package com.toeic.service;

import java.util.List;

import com.toeic.dto.response.TestResponse;

public interface TestService {
	List<TestResponse> getAll(String title, int page, int size);
	List<TestResponse> getByCategory(String catename, String title,int page, int size);
}
