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

import com.dimex.demo.model.DamageItem;
import com.dimex.demo.repository.DamageItemRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class DamageItemController {

	@Autowired
	private DamageItemRepository damageitemRepository;
	
	// Get All 
	@GetMapping("/damageitem")
	public List<DamageItem> getAllDamageItems(){
		return damageitemRepository.findAll();
	}
	
	// Post DamageItem
	@PostMapping("/damageitem")
	public DamageItem createDamageItem (@RequestBody DamageItem damageitem) {
		return damageitemRepository.save(damageitem);
	}

	// get DamageItem by id rest api
	@GetMapping("/damageitem/{id}")
	public ResponseEntity<DamageItem> getDamageItemById(@PathVariable Long id) {
		DamageItem DamageItem = damageitemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DamageItem not exist with id :" + id));
	return ResponseEntity.ok(DamageItem);
	}
	
	@PutMapping("/damageitem/{id}")
	public ResponseEntity<DamageItem> updateDamageItem(@PathVariable Long id, @RequestBody DamageItem returnitemDetails){
		DamageItem damageitem = damageitemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DamageItem not exist with id :" + id));
					
		damageitem.setItemCode(returnitemDetails.getItemCode());
		damageitem.setItemName(returnitemDetails.getItemName());
		damageitem.setSupName(returnitemDetails.getSupName());
		damageitem.setSellDate(returnitemDetails.getSellDate());
		damageitem.setSellTime(returnitemDetails.getSellTime());
		damageitem.setItemQty(returnitemDetails.getItemQty());

		
		DamageItem updatedreturnitem = damageitemRepository.save(damageitem);
		return ResponseEntity.ok(updatedreturnitem);
	}
	
	@DeleteMapping("/damageitem/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteDamageItem(@PathVariable Long id){
		DamageItem damageitem = damageitemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DamageItem not exist with id :" + id));
		
		damageitemRepository.delete(damageitem);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
