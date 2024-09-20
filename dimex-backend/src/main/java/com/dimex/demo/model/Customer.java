package com.dimex.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "customer_name")
	private String customername;
	
	@Column(name = "customer_category") 
	private String customercategory;
	
	@Column(name = "customer_date") 
	private String customerdate;
	
	@Column(name = "customer_phone")
	private String customerphone;
	
	
	public Customer() {
		
	}
	
	
	public Customer(String customername, String customercategory,String customerdate, String customerphone ) {
		super();
		this.customername = customername;
		this.customercategory = customercategory;
		this.customerdate = customerdate;
		this.customerphone = customerphone;
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getCusName() {
		return customername;
	}
	public void setCusName(String customername) {
		this.customername = customername;
	}
	
	public String getCusCategory() {
		return customercategory;
	}
	public void setCusCategory(String customercategory) {
		this.customercategory = customercategory;
	}
	
	public String getCusDate() {
		return customerdate;
	}
	public void setCusDate(String customerdate) {
		this.customerdate = customerdate;
	}

	public String getCusPhone() {
		return customerphone;
	}
	public void setCusPhone(String customerphone) {
		this.customerphone = customerphone;
	}
	
	
		

}
