package com.dimex.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "purchases")
public class PurchaseItems {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "item_category")
	private String itemcategory;
	
	@Column(name = "item_name")
	private String itemname;
	
	@Column(name = "item_code")
	private String itemcode;
	
	@Column(name = "purchase_date")
	private String purchasedate;
	
	@Column(name = "unit_price")
	private String unitprice;
	
	@Column(name = "purchase_qty")
	private String purchaseqty;
	
	@Column(name = "total_amount")
	private String totalamount;
	
	@Column(name = "sup_name")
	private String suppliername;
	
	
	public PurchaseItems() {
		
	}
	
	
	public PurchaseItems(String itemcategory, String itemname, String itemcode, String purchasedate, String unitprice, String purchaseqty, String totalamount, String suppliername ) {
		super();
		this.itemcategory = itemcategory;
		this.itemname = itemname;
		this.itemcode = itemcode;
		this.purchasedate = purchasedate;
		this.unitprice = unitprice;
		this.purchaseqty = purchaseqty;
		this.totalamount = totalamount;
		this.suppliername = suppliername;
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	
	public String getItemCode() {
		return itemcode;
	}
	public void setItemCode(String itemcode) {
		this.itemcode = itemcode;
	}
	
	public String getPurchDate() {
		return purchasedate;
	}
	public void setPurchDate(String purchasedate) {
		this.purchasedate = purchasedate;
	}
	
	public String getUnitPrice() {
		return unitprice;
	}
	public void setUnitPrice(String unitprice) {
		this.unitprice = unitprice;
	}
	
	public String getPurchQTY() {
		return purchaseqty;
	}
	public void setPurchQTY(String purchaseqty) {
		this.purchaseqty = purchaseqty;
	}
	
	public String getPurchTotal() {
		return totalamount;
	}
	public void setPurchTotal(String totalamount) {
		this.totalamount = totalamount;
	}
	
	public String getSupName() {
		return suppliername;
	}
	public void setSupName(String suppliername) {
		this.suppliername = suppliername;
	}
	
	
		

}
