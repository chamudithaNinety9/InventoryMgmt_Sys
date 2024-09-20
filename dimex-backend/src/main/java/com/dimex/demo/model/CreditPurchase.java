package com.dimex.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "creditpurchase")  
public class CreditPurchase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "sup_name")
	private String suppliername;
	
	@Column(name = "purchase_date") 
	private String purchasedate;
	
	@Column(name = "credit_period") 
	private String creditperiod;
	
	@Column(name = "end_date")
	private String enddate;
	
	@Column(name = "credit_amount")
	private String creditamount;
	
	@Column(name = "credit_status")
	private String creditstatus;
	
	
	public CreditPurchase() {
		
	}
	
	
	public CreditPurchase(String suppliername, String purchasedate,String creditperiod, String enddate, String creditamount,String creditstatus) {
		super();
		this.suppliername = suppliername;
		this.purchasedate = purchasedate;
		this.creditperiod = creditperiod;
		this.enddate = enddate;
		this.creditamount = creditamount;
		this.creditstatus = creditstatus;
	
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
	
	public String getPurchaseDate() {
		return purchasedate;
	}
	public void setPurchaseDate(String purchasedate) {
		this.purchasedate = purchasedate;
	}
	
	public String getCreditPeriod() {
		return creditperiod;
	}
	public void setCreditPeriod(String creditperiod) {
		this.creditperiod = creditperiod;
	}
	
	public String getEndDate() {
		return enddate;
	}
	public void setEndDate(String enddate) {
		this.enddate = enddate;
	}

	public String getCreditAmount() {
		return creditamount;
	}
	public void setCreditAmount(String creditamount) {
		this.creditamount = creditamount;
	}
	
	public String getCreditStatus() {
		return creditstatus;
	}
	public void setCreditStatus(String creditstatus) {
		this.creditstatus = creditstatus;
	}
	

}
