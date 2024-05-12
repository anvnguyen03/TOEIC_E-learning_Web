package com.toeic.entity;

import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "test_category")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="cate_name")
	private String cateName;
	private int duration;
	@Column(name="number_of_part")
	private int numberOfPart;
	@Column(name="number_of_question")
	private int numberOfQuestion;
	@Column(name="maximum_score")
	private int maximumScore;
	private int year;
	
	@OneToMany(mappedBy = "testCategory", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Test> listTest;
	
}