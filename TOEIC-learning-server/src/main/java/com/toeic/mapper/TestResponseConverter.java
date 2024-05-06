package com.toeic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import com.toeic.dto.response.TestResponse;
import com.toeic.entity.Test;

public class TestResponseConverter {
	public static List<TestResponse> convertFromListTest(List<Test> listTest, int totalPages) {
        return listTest.stream().map(test -> TestResponse.builder()
        		.id(test.getId())
        		.testTitle(test.getTestTitle())
                .cateName(test.getTestCategory() != null ? test.getTestCategory().getCateName() : null)
                .duration(test.getTestCategory() != null ? test.getTestCategory().getDuration() : null)
                .numberOfPart(test.getTestCategory() != null ? test.getTestCategory().getNumberOfPart() : null)
                .numberOfQuestion(test.getTestCategory() != null ? test.getTestCategory().getNumberOfQuestion() : null)
                .maximumScore(test.getTestCategory() != null ? test.getTestCategory().getMaximumScore() : null)
                .year(test.getTestCategory() != null ? test.getTestCategory().getYear() : null)
                .totalPages(totalPages)
                .build()).collect(Collectors.toList());
        		
    }
}
