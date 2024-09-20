package com.dimex.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "returnitem")
public class ReturnItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "item_code")
	private String itemcode;
	
	@Column(name = "item_name") 
	private String itemname;
	
	@Column(name = "sell_date") 
	private String selldate;
	
	@Column(name = "sell_time")
	private String selltime;
	
	@Column(name = "sell_price")
	private String sellprice;
	
	@Column(name = "item_qty")
	private String itemqty;
	
	@Column(name = "sell_discount")
	private String selldiscount;
	
	@Column(name = "sell_total")
	private String selltotal;
	
	
	public ReturnItem() {
		
	}
	
	
	public ReturnItem(String itemcode, String itemname,String selldate, String selltime, String sellprice, String itemqty, String selldiscount, String selltotal) {
		super();
		this.itemcode = itemcode;
		this.itemname = itemname;
		this.selldate = selldate;
		this.selltime = selltime;
		this.sellprice = sellprice;
		this.itemqty = itemqty;
		this.selldiscount = selldiscount;
		this.selltotal = selltotal;
	
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

	public String getSellPrice() {
		return sellprice;
	}
	public void setSellPrice(String sellprice) {
		this.sellprice = sellprice;
	}
	
	public String getItemQty() {
		return itemqty;
	}
	public void setItemQty(String itemqty) {
		this.itemqty = itemqty;
	}
	
	
	public String getDiscount() {
		return selldiscount;
	}
	public void setDiscount(String selldiscount) {
		this.selldiscount = selldiscount;
	}
	
	
	public String getSellTotal() {
		return selltotal;
	}
	public void setSellTotal(String selltotal) {
		this.selltotal = selltotal;
	}
	
	
		

}
