package com.toeic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.toeic.entity.Question;
import com.toeic.entity.Test;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>{
	List<Question> findByTest(Test test);
}
