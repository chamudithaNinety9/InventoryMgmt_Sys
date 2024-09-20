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

import com.dimex.demo.model.ReturnItem;
import com.dimex.demo.repository.ReturnItemRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class ReturnItemController {

	@Autowired
	private ReturnItemRepository returnitemRepository;
	
	// Get All 
	@GetMapping("/returnitem")
	public List<ReturnItem> getAllReturnItems(){
		return returnitemRepository.findAll();
	}
	
	// Post ReturnItem
	@PostMapping("/returnitem")
	public ReturnItem createReturnItem (@RequestBody ReturnItem returnitem) {
		return returnitemRepository.save(returnitem);
	}

	// get ReturnItem by id rest api
	@GetMapping("/returnitem/{id}")
	public ResponseEntity<ReturnItem> getReturnItemById(@PathVariable Long id) {
		ReturnItem ReturnItem = returnitemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ReturnItem not exist with id :" + id));
	return ResponseEntity.ok(ReturnItem);
	}
	
	@PutMapping("/returnitem/{id}")
	public ResponseEntity<ReturnItem> updateReturnItem(@PathVariable Long id, @RequestBody ReturnItem returnitemDetails){
		ReturnItem returnitem = returnitemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ReturnItem not exist with id :" + id));
					
		returnitem.setItemCode(returnitemDetails.getItemCode());
		returnitem.setItemName(returnitemDetails.getItemName());
		returnitem.setSellDate(returnitemDetails.getSellDate());
		returnitem.setSellTime(returnitemDetails.getSellTime());
		returnitem.setSellPrice(returnitemDetails.getSellPrice());
		returnitem.setItemQty(returnitemDetails.getItemQty());
		returnitem.setDiscount(returnitemDetails.getDiscount());
		returnitem.setSellTotal(returnitemDetails.getSellTotal());
		
		
		ReturnItem updatedreturnitem = returnitemRepository.save(returnitem);
		return ResponseEntity.ok(updatedreturnitem);
	}
	
	@DeleteMapping("/returnitem/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteReturnItem(@PathVariable Long id){
		ReturnItem returnitem = returnitemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ReturnItem not exist with id :" + id));
		
		returnitemRepository.delete(returnitem);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
