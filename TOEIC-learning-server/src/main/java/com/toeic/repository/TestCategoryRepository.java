package com.toeic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toeic.entity.TestCategory;

public interface TestCategoryRepository extends JpaRepository<TestCategory, Long>{

}
