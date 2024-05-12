package com.toeic.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import com.toeic.entity.Role;
import com.toeic.service.UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final UserService userService;
	private String[] testsUrl = {"/api/v1/test-categories/", "/api/v1/tests/**", "/api/v1/questions/**"};
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		http
			.csrf(csrf -> csrf.disable())
			.authorizeHttpRequests(request -> request
												.requestMatchers(testsUrl).permitAll()
												.requestMatchers("/images/**").permitAll()
				                                .requestMatchers("/audios/**").permitAll()
												.requestMatchers("/api/v1/auth/**").permitAll()
												.requestMatchers("/api/v1/admin").hasAnyAuthority(Role.ADMIN.name())
												.requestMatchers("/api/v1/user/**").hasAnyAuthority(Role.USER.name())
												.requestMatchers("/api/v1/login/**").anonymous()
												.anyRequest().authenticated())
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authenticationProvider(AuthenticationProvider())
//			.addFilterBefore(customCorsFilter, UsernamePasswordAuthenticationFilter.class)		// same position, added first - execute first
			.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}

	@Bean
	AuthenticationProvider AuthenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userService.userDetailsService());
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}