package com.toeic.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "test_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "test_id", nullable = false)
	@JsonIgnore
	private Test test;
	
	@Column(name = "completion_time")
	private int completionTime;
	
	@Column(name = "num_listening_correct_answers")
	private int numListeningCorrectAnswers;
	
	@Column(name = "listening_score")
	private int listeningScore;
	
	@Column(name = "num_reading_correct_answers")
	private int numReadingCorrectAnswers;
	
	@Column(name = "reading_score")
	private int readingScore;
	
	@Column(name = "total_score")
	private int totalScore;
	
	@Column(name = "num_correct_answers")
    private Integer numCorrectAnswers;

    @Column(name = "num_wrong_answers")
    private Integer numWrongAnswers;

    @Column(name = "num_skipped_questions")
    private Integer numSkippedQuestions;
    
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
}
