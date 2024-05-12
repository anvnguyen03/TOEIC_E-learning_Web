package com.toeic.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.toeic.entity.User;

public interface UserService {
	UserDetailsService userDetailsService();

	User findByUserFullname(String username);

	User findByUserEmail(String email);

	User update(User currentUser);
}
