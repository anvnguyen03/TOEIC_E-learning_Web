package com.toeic.entity;


import java.util.Date;

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

@Entity
@Table(name = "test")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Test{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "test_title")
	private String testTitle;
	
	private TestStatus status;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="test_category_id")
	private TestCategory testCategory;
	
	private int duration;
	
	@Column(name = "created_at")
	private Date createdAt;
	
	@Column(name = "updated_at")
	private Date updatedAt;
	
	public Test(String testTitle, TestCategory testCategory) {
		this.testTitle = testTitle;
		this.status = TestStatus.ENABLE;
		this.testCategory = testCategory;
		this.duration = testCategory.getDuration();
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}
