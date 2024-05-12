package com.toeic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "question")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(columnDefinition = "TEXT")
	private String content;

	@Column(name = "option_a", columnDefinition = "TEXT")
	private String optionA;

	@Column(name = "option_b", columnDefinition = "TEXT")
	private String optionB;

	@Column(name = "option_c", columnDefinition = "TEXT")
	private String optionC;

	@Column(name = "option_d", columnDefinition = "TEXT")
	private String optionD;

	@Column(name = "correct_option", columnDefinition = "TEXT")
	private String correctOption;

	@Lob
	@Column(columnDefinition = "TEXT")
	private String image;

	@Lob
	@Column(columnDefinition = "TEXT")
	private String audio;

	@Column(columnDefinition = "TEXT")
	private String script;

	@Column(columnDefinition = "TEXT")
	private String explaintation;

	@Column(name = "question_passage", columnDefinition = "TEXT")
	private String questionPassage;

	@Column(name = "order_number")
	private int orderNumber;
	
	private int part;
	
	@ManyToOne
	@JoinColumn(name = "test_id", nullable = false)
	@JsonIgnore
	private Test test;
}
