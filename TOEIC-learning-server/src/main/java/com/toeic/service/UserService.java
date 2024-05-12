package com.toeic.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.toeic.entity.Status;
import com.toeic.entity.User;

public interface UserService {
	UserDetailsService userDetailsService();

	Optional<User> findByEmail(String email);

	User save(User user);

	Optional<User> findByUsername(String username);

	void deleteByEmailAndStatus(String email, Status status);
}
