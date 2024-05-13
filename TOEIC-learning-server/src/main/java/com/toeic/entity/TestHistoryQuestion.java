package com.toeic.entity;

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
@Table(name = "test_history_question")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestHistoryQuestion {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "test_history_id", nullable = false)
	@JsonIgnore
	private TestHistory testHistory;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "question_id", nullable = false)
	@JsonIgnore
	private Question question;
	
	@Column(name = "selected_option", columnDefinition = "TEXT")
    private String selectedOption;

    @Column(name = "is_correct")
    private boolean isCorrect;
}
