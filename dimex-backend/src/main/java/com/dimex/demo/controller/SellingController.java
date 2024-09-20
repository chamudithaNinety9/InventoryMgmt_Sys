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

import com.dimex.demo.model.Selling;
import com.dimex.demo.repository.SellingRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class SellingController {

	@Autowired
	private SellingRepository sellingRepository;
	
	// Get All 
	@GetMapping("/selling")
	public List<Selling> getAllSellings(){
		return sellingRepository.findAll();
	}
	
	// Post Selling
	@PostMapping("/selling")
	public Selling createSelling (@RequestBody Selling selling) {
		return sellingRepository.save(selling);
	}

	// get Selling by id rest api
	@GetMapping("/selling/{id}")
	public ResponseEntity<Selling> getSellingById(@PathVariable Long id) {
		Selling Selling = sellingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Selling not exist with id :" + id));
	return ResponseEntity.ok(Selling);
	}
	
	@PutMapping("/selling/{id}")
	public ResponseEntity<Selling> updateSelling(@PathVariable Long id, @RequestBody Selling sellingDetails){
		Selling selling = sellingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Selling not exist with id :" + id));
					
		selling.setItemCode(sellingDetails.getItemCode());
		selling.setItemName(sellingDetails.getItemName());
		selling.setSellDate(sellingDetails.getSellDate());
		selling.setSellTime(sellingDetails.getSellTime());
		selling.setSellPrice(sellingDetails.getSellPrice());
		selling.setItemQty(sellingDetails.getItemQty());
		selling.setDiscount(sellingDetails.getDiscount());
		selling.setSellTotal(sellingDetails.getSellTotal());
		selling.setSellProfit(sellingDetails.getSellProfit());
		
		
		Selling updatedselling = sellingRepository.save(selling);
		return ResponseEntity.ok(updatedselling);
	}
	
	@DeleteMapping("/selling/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteSelling(@PathVariable Long id){
		Selling selling = sellingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Selling not exist with id :" + id));
		
		sellingRepository.delete(selling);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
