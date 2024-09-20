package com.dimex.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "damageitem")
public class DamageItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "item_code")
	private String itemcode;
	
	@Column(name = "item_name") 
	private String itemname;
	
	@Column(name = "sup_name")
	private String supname;
	
	@Column(name = "sell_date") 
	private String selldate;
	
	@Column(name = "sell_time")
	private String selltime;
	
	@Column(name = "item_qty")
	private String itemqty;
	
	
	public DamageItem() {
		
	}
	
	
	public DamageItem(String itemcode, String itemname, String supname, String selldate, String selltime,  String itemqty) {
		super();
		this.itemcode = itemcode;
		this.itemname = itemname;
		this.supname = supname;
		this.selldate = selldate;
		this.selltime = selltime;
		this.itemqty = itemqty;

	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getItemCode() {
		return itemcode;
	}
	public void setItemCode(String itemcode) {
		this.itemcode = itemcode;
	}
	
	public String getItemName() {
		return itemname;
	}
	public void setItemName(String itemname) {
		this.itemname = itemname;
	}
	
	public String getSupName() {
		return supname;
	}
	public void setSupName(String supname) {
		this.supname = supname;
	}
	
	public String getSellDate() {
		return selldate;
	}
	public void setSellDate(String selldate) {
		this.selldate = selldate;
	}
	
	public String getSellTime() {
		return selltime;
	}
	public void setSellTime(String selltime) {
		this.selltime = selltime;
	}

	
	public String getItemQty() {
		return itemqty;
	}
	public void setItemQty(String itemqty) {
		this.itemqty = itemqty;
	}
	
	
	
		

}
