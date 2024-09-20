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

import com.dimex.demo.model.Item;
import com.dimex.demo.repository.ItemRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;
	
	// Get All items
	@GetMapping("/item")
	public List<Item> getAllItems(){
		return itemRepository.findAll();
	}
	
	// Post Item
	@PostMapping("/item")
	public Item createItem (@RequestBody Item item) {
		return itemRepository.save(item);
	}

	// get Item by id rest api
	@GetMapping("/item/{id}")
	public ResponseEntity<Item> getItemById(@PathVariable Long id) {
		Item Item = itemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not exist with id :" + id));
	return ResponseEntity.ok(Item);
	}
	
	@PutMapping("/item/{id}")
	public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails){
		Item item = itemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not exist with id :" + id));
					
		item.setItemCode(itemDetails.getItemCode());
		item.setItemCategory(itemDetails.getItemCategory());
		item.setItemName(itemDetails.getItemName());
		item.setMarkedPrice(itemDetails.getMarkedPrice());
		item.setSellPrice(itemDetails.getSellPrice());
		item.setItemQty(itemDetails.getItemQty());
		
		Item updateditem = itemRepository.save(item);
		return ResponseEntity.ok(updateditem);
	}
	
	@DeleteMapping("/item/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteItem(@PathVariable Long id){
		Item item = itemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not exist with id :" + id));
		
		itemRepository.delete(item);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
