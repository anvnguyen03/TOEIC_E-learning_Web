package com.toeic.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "test")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Test{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "test_title")
	private String testTitle;
	private int status = 1;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="test_category_id")
	private TestCategory testCategory;
}
