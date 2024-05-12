package com.toeic.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.toeic.dto.JwtAuthenticationResponse;
import com.toeic.dto.SignInRequest;
import com.toeic.dto.SignUpRequest;
import com.toeic.dto.ValidateTokenRequest;
import com.toeic.dto.response.SignupResponse;
import com.toeic.dto.response.VerifyResponse;
import com.toeic.entity.User;
import com.toeic.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
public class AuthenticationController {
	private final AuthenticationService authenticationService;
	
	@PostMapping("/signup")
	public ResponseEntity<SignupResponse> signup(@RequestBody SignUpRequest signUpRequest) {
		System.out.println("register post");
		return ResponseEntity.ok(authenticationService.signup(signUpRequest));
	}
	
	@GetMapping("/verify")
	public ResponseEntity<VerifyResponse> verifyUser(@RequestParam("code") String code) {
		VerifyResponse response = new VerifyResponse();
	    if(authenticationService.verifyUser(code)) {
	    	System.out.println("verify get");
	    	response.setMessage("verify success");
	    	response.setError(false);
	    } else {
	    	response.setMessage("verify failed");
	    	response.setError(true);
	    }
	    return ResponseEntity.ok(response);
	}
	
	@PostMapping("/signin")
	public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SignInRequest signInRequest) {
		return ResponseEntity.ok(authenticationService.signin(signInRequest));
	}
	
	@PostMapping("/validate-token")
	public ResponseEntity<Boolean> validateToken(@RequestBody ValidateTokenRequest token) {
		return ResponseEntity.ok(authenticationService.validateToken(token));
	}
}
