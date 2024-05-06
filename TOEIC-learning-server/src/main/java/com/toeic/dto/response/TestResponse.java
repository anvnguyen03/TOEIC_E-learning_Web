package com.toeic.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestResponse {
	private long id;
	private String testTitle;
	private boolean status;
	private String cateName;
	private int duration;
	private int numberOfPart;
	private int numberOfQuestion;
	private int maximumScore;
	private int year;
	private int totalPages;
}
