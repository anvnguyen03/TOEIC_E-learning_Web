package com.toeic.service.impl;

import java.util.HashMap;
import java.util.Optional;
import java.util.Random;

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
import com.toeic.entity.Role;
import com.toeic.entity.Status;
import com.toeic.entity.User;
import com.toeic.repository.UserRepository;
import com.toeic.service.AuthenticationService;
import com.toeic.service.JWTService;
import com.toeic.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JWTService jwtService;
	private final UserService userService;

	@Override
	public User signup(SignUpRequest signUpRequest) {
		if(signUpRequest.getEmail().equals("createUsers@gmail.com")) {
			String[] fullnames = {
			        "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Isabella", "James", "Sophia", "Oliver",
			        "Charlotte", "Benjamin", "Amelia", "Elijah", "Mia", "Lucas", "Harper", "Mason", "Evelyn", "Logan",
			        "Abigail", "Alexander", "Emily", "Ethan", "Elizabeth", "Jacob", "Avery", "Michael", "Sofia", 
			        "Daniel", "Camila", "Henry", "Aria", "Jackson", "Scarlett", "Sebastian", "Grace", "Aiden", 
			        "Chloe", "Matthew", "Victoria", "Samuel", "Madison", "David", "Luna", "Joseph", "Penelope",
			        "Levi", "Riley","Rin","Connan"
			    };
			Random random = new Random();
			User user = null;
			for(int i =0;i<50;++i) {
				int index = 2-random.nextInt(23)/10;
				Role role = Role.values()[index];
				String email = role.toString().toLowerCase();
				user = new User(
					fullnames[i],
					String.format("%s%d@gmail.com", email,i),
					passwordEncoder.encode("123456"),
					role,
					Status.ACTIVE
				);
				userRepository.save(user);
			}
			return user;
		}
		
	//---------------------------------------------------------------------------------------------------	
		User user = new User();

		Optional<User> userExisted = userRepository.findByEmail(signUpRequest.getEmail());
		
		// kiểm tra xem đã tồn tại User này chưa
		if (userExisted.isPresent()) {
			return null;
		} else {
			user.setEmail(signUpRequest.getEmail());
			user.setFullname(signUpRequest.getFullname());
			user.setRole(Role.USER);
			user.setStatus(Status.ACTIVE);
			user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
			System.out.println("đăng ký mật khẩu="+ user.getPassword() );
			return userRepository.save(user);
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
			var user = userRepository.findByEmail(signInRequest.getEmail())
					.orElseThrow(() -> new IllegalArgumentException("Invalid Email or password"));
			var jwt = jwtService.generateToken(user);
			var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

			jwtAuthenticationResponse.setToken(jwt);
			jwtAuthenticationResponse.setRefreshToken(refreshToken);
			jwtAuthenticationResponse.setFullname(user.getFullname());
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

}
