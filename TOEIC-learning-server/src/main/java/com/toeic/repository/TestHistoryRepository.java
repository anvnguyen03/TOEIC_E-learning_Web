package com.toeic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.toeic.entity.TestHistory;

@Repository
public interface TestHistoryRepository extends JpaRepository<TestHistory, Long>{

}
