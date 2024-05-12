package com.toeic.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toeic.dto.EmailRequest;
import com.toeic.entity.User;
import com.toeic.service.UserService;
import com.toeic.service.impl.EmailService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/login")
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
@RequiredArgsConstructor
public class LoginController {
	@Autowired
	private UserService userService;
	@Autowired
	private EmailService emailService;
	
	private final PasswordEncoder passwordEncoder;
	
	@PostMapping("/foget-password")
	public ResponseEntity<Boolean> fogetPassword(@RequestBody Map<String, String> data) {
		User user = userService.findByUserEmail(data.get("email"));
		String code = data.get("code");
		boolean isAccountExist = (user != null);
		if (isAccountExist == true) {
			sendEmailToUserMail(user,code);
		}
		System.out.println(isAccountExist);
		return ResponseEntity.ok(isAccountExist);
	}

	private void sendEmailToUserMail(User user, String code) {
		EmailRequest request = generateRequest(user,code);

		try {
			emailService.sendEmail(request.to, request.subject, request.body);
		} catch ( MessagingException e) {
			e.printStackTrace();
		}
		
	}

	private EmailRequest generateRequest(User customer,String code) {

		final String siteURL = "http://localhost:4200/my-fogot-password"; // sửa dùm chữ r đi 
		String subject = "Please verify your forgot password";
		StringBuilder contentBuilder = new StringBuilder();
		contentBuilder.append("Dear ").append(customer.getFullname()).append(",<br>")
				.append("Please click the link below to verify your registration:<br>").append("<h3><a href=\"")
				.append(siteURL).append('/').append(customer.getEmail()).append('/').append(code).append("\" target=\"_self\">VERIFY</a></h3>")
				.append("Thank you,<br>").append("Your company name.");
		String content = contentBuilder.toString();
		
		return new EmailRequest(customer.getEmail(), subject, content);
	}
	@PutMapping("/reset-password")
	public ResponseEntity<Boolean> resetPassword(@RequestBody Map<String, String> data) {
	    String email = data.get("email");
	    String newPassword = data.get("password");
		User user = userService.findByUserEmail(email);
		user.setPassword(passwordEncoder.encode(newPassword));
		boolean successful = userService.update(user) != null;
		return ResponseEntity.ok(successful);

	}

}
