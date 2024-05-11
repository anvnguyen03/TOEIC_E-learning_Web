package com.toeic.dto;

import lombok.Data;

@Data
public class TestDto {
	private long id;
	private String testTitle;
	private int status;
	private long categoryId;
}
