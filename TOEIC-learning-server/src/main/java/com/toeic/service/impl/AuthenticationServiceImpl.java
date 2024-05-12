package com.toeic.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.toeic.dto.JwtAuthenticationResponse;
import com.toeic.dto.SignInRequest;
import com.toeic.dto.SignUpRequest;
import com.toeic.dto.ValidateTokenRequest;
import com.toeic.dto.response.SignupResponse;
import com.toeic.email.EmailSender;
import com.toeic.entity.Role;
import com.toeic.entity.Status;
import com.toeic.entity.User;
import com.toeic.service.AuthenticationService;
import com.toeic.service.JWTService;
import com.toeic.service.UserService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JWTService jwtService;
	private final UserService userService;
	private final EmailSender emailSender;

	@Override
	public SignupResponse signup(SignUpRequest signUpRequest) {
		User user = new User();

		Optional<User> userExisted = userService.findByEmail(signUpRequest.getEmail());
		
		// kiểm tra xem đã tồn tại User này chưa
		if (userExisted.isPresent()) {
			return null;
		} else {
			user.setEmail(signUpRequest.getEmail());
			user.setFullname(signUpRequest.getFullname());
			user.setRole(Role.USER);
			user.setStatus(Status.LOCKED);
			user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

			user = userService.save(user);
			
			SignupResponse signupResponse = new SignupResponse();
			String activateToken = jwtService.generateActivateToken(user);
			
			signupResponse.setToken(activateToken);
			System.out.println(activateToken);
			try {
				emailSender.sendActivationLink(user, "http://localhost:4200/signup", activateToken);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return signupResponse;
		}
				
	}

	@Override
	public JwtAuthenticationResponse signin(SignInRequest signInRequest) {
		
		// khởi tạo một đối tượng authentication để thực hiện xác thực qua lớp Username Password
		Authentication authentication;
		
		try {
			authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
		} catch (AuthenticationException e) {
			authentication = null;
		}

		JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

		// kiểm tra xem đối tượng authentication đã xác thực thành công chưa
		if (authentication != null && authentication.isAuthenticated()) {
			var user = userService.findByEmail(signInRequest.getEmail())
					.orElseThrow(() -> new IllegalArgumentException("Invalid Email or password"));
			var jwt = jwtService.generateToken(user);
			var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

			jwtAuthenticationResponse.setToken(jwt);
			jwtAuthenticationResponse.setRefreshToken(refreshToken);
		} else {
			jwtAuthenticationResponse.setError("Invalid Email or password");
		}

		return jwtAuthenticationResponse;
	}

	@Override
	public Boolean validateToken(ValidateTokenRequest token) {
		String userEmail;
		try {
			userEmail = jwtService.extractUsername(token.getToken());	
		} catch (Exception e) {
			userEmail = "";
			System.out.println("Error: " + e);
		}
		
		if (!userEmail.isEmpty()) {
			UserDetails userDetails = this.userService.userDetailsService().loadUserByUsername(userEmail);
			if (jwtService.isTokenValid(token.getToken(), userDetails)) {
				return true;
			} 
			return false;
		} else {
			return false;
		}
	}

	@Override
	public boolean verifyUser(String code) {
		String username = jwtService.extractUsername(code);
		if(!username.isEmpty()) {
			UserDetails userDetails = this.userService.userDetailsService().loadUserByUsername(username);
			Optional<User> user = this.userService.findByUsername(username);
			if (jwtService.isTokenValid(code, userDetails)) {
				User newUser = user.get();
				newUser.setStatus(Status.ACTIVE);
				this.userService.save(newUser);
				this.userService.deleteByEmailAndStatus(user.get().getEmail(), Status.LOCKED);
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

}
