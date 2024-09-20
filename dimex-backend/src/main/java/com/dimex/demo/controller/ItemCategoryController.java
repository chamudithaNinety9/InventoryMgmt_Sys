package com.dimex.demo.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dimex.demo.model.ItemCategory;
import com.dimex.demo.repository.ItemCategoryRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class ItemCategoryController {

	@Autowired
	private ItemCategoryRepository categoryRepository;
	
	// Get All 
	@GetMapping("/category")
	public List<ItemCategory> getAllItemCategorys(){
		return categoryRepository.findAll();
	}
	
	// Post ItemCategory
	@PostMapping("/category")
	public ItemCategory createItemCategory (@RequestBody ItemCategory category) {
		return categoryRepository.save(category);
	}

	// get ItemCategory by id rest api
	@GetMapping("/category/{id}")
	public ResponseEntity<ItemCategory> getItemCategoryById(@PathVariable Long id) {
		ItemCategory ItemCategory = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCategory not exist with id :" + id));
	return ResponseEntity.ok(ItemCategory);
	}
	
	@PutMapping("/category/{id}")
	public ResponseEntity<ItemCategory> updateItemCategory(@PathVariable Long id, @RequestBody ItemCategory categoryDetails){
		ItemCategory category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCategory not exist with id :" + id));
					
		category.setItemCategory(categoryDetails.getItemCategory());
		category.setCategoryDate(categoryDetails.getCategoryDate());
		
		ItemCategory updatedcategory = categoryRepository.save(category);
		return ResponseEntity.ok(updatedcategory);
	}
	
	@DeleteMapping("/category/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteItemCategory(@PathVariable Long id){
		ItemCategory category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCategory not exist with id :" + id));
		
		categoryRepository.delete(category);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
