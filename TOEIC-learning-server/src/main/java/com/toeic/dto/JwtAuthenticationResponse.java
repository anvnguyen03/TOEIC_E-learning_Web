package com.toeic.dto;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
	private String token;
	private String refreshToken;
	private String fullname;
	private String error;
}
