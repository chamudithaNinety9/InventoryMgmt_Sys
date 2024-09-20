package com.dimex.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "suppliers")
public class Supplier {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "sup_name")
	private String suppliername;
	
	@Column(name = "sup_date")
	private String supplierdate;
	
	@Column(name = "sup_address")
	private String supplieraddress;
	
	@Column(name = "sup_phone")
	private String supplierphone;
	
	
	public Supplier() {
		
	}
	
	
	public Supplier(String suppliername,String supplierdate, String supplieraddress, String supplierphone ) {
		super();
		this.suppliername = suppliername;
		this.supplierdate = supplierdate;
		this.supplieraddress = supplieraddress;
		this.supplierphone = supplierphone;
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getSupName() {
		return suppliername;
	}
	public void setSupName(String suppliername) {
		this.suppliername = suppliername;
	}
	
	public String getSupDate() {
		return supplierdate;
	}
	public void setSupDate(String supplierdate) {
		this.supplierdate = supplierdate;
	}
	
	public String getSupAddress() {
		return supplieraddress;
	}
	public void setSupAddress(String supplieraddress) {
		this.supplieraddress = supplieraddress;
	}
	
	public String getSupPhone() {
		return supplierphone;
	}
	public void setSupPhone(String supplierphone) {
		this.supplierphone = supplierphone;
	}
	
	
		

}
