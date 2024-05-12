package com.toeic.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.toeic.entity.Role;
import com.toeic.entity.Status;
import com.toeic.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByEmail(String email);
	User findByRole(Role role);
	void deleteByEmailAndStatus(String email, Status status);
	Optional<User> findByUsername(String username);
	User findByFullname(String fullname);
}
