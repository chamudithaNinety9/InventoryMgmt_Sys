package com.dimex.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class Item {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "item_code")
	private String itemcode;
	
	@Column(name = "item_category")
	private String itemcategory;
	
	@Column(name = "item_name")
	private String itemname;
	
	@Column(name = "marked_price")
	private String markedprice;
	
	@Column(name = "sell_price")
	private String sellprice;
	
	@Column(name = "item_qty")
	private String itemqty;
	
	
	public Item() {
		
	}
	
	
	public Item(String itemcode, String itemcategory, String itemname,  String markedprice, String sellprice, String itemqty ) {
		super();
		this.itemcode = itemcode;
		this.itemcategory = itemcategory;
		this.itemname = itemname;
		this.markedprice = markedprice;
		this.sellprice = sellprice;
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
	
	public String getItemCategory() {
		return itemcategory;
	}
	public void setItemCategory(String itemcategory) {
		this.itemcategory = itemcategory;
	}
	
	public String getItemName() {
		return itemname;
	}
	public void setItemName(String itemname) {
		this.itemname = itemname;
	}
	
	public String getMarkedPrice() {
		return markedprice;
	}
	public void setMarkedPrice(String markedprice) {
		this.markedprice = markedprice;
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
	
	
		

}
