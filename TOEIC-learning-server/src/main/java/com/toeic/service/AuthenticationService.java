package com.toeic.service;

import com.toeic.dto.JwtAuthenticationResponse;
import com.toeic.dto.SignInRequest;
import com.toeic.dto.SignUpRequest;
import com.toeic.dto.ValidateTokenRequest;
import com.toeic.dto.response.SignupResponse;

public interface AuthenticationService {
	SignupResponse signup(SignUpRequest signUpRequest);
	JwtAuthenticationResponse signin(SignInRequest signInRequest);
	Boolean validateToken(ValidateTokenRequest token);
	boolean verifyUser(String code);
}
