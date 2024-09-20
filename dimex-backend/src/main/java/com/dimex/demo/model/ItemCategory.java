package com.dimex.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "itemcategorys")
public class ItemCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "item_category")
	private String itemcategory;
	
	@Column(name = "category_date")
	private String categorydate;
	
	
	
	public ItemCategory() {
		
	}
	
	
	public ItemCategory(String itemcategory,String categorydate, String supplieraddress, String supplierphone ) {
		super();
		this.itemcategory = itemcategory;
		this.categorydate = categorydate;

		
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
	
	public String getCategoryDate() {
		return categorydate;
	}
	public void setCategoryDate(String categorydate) {
		this.categorydate = categorydate;
	}
	
		

}
