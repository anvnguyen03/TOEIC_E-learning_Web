package com.toeic.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.toeic.entity.Test;

public interface TestRepository extends JpaRepository<Test, Long>{
	Page<Test> findByTestTitleContaining(String title, Pageable pageable);
	Page<Test> findByTestCategory_CateNameAndTestTitleContaining(String catename, String title, Pageable pageable);
}
