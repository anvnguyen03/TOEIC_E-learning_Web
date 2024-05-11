package com.toeic.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.toeic.entity.User;
import com.toeic.repository.UserRepository;
import com.toeic.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	private final UserRepository userRepository;
	
	@Override
	public UserDetailsService userDetailsService() {
		return new UserDetailsService() {
			
			@Override
			public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
				return userRepository.findByEmail(username)
						.orElseThrow(() -> new UsernameNotFoundException("User not found"));
			}
		};
	}

	@Override
	public User findByUserFullname(String fullname) {
		return userRepository.findByFullname(fullname);
	}

	@Override
	public User findByUserEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}

	@Override
	public User update(User currentUser) {
		return userRepository.save(currentUser);
		
	}
	
	
	
}
