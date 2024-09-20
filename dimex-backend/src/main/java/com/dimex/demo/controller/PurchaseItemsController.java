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

import com.dimex.demo.model.PurchaseItems;
import com.dimex.demo.repository.PurchaseItemsRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class PurchaseItemsController {

	@Autowired
	private PurchaseItemsRepository purchaseRepository;
	
	// Get All purchases
	@GetMapping("/purchase")
	public List<PurchaseItems> getAllPurchaseItemss(){
		return purchaseRepository.findAll();
	}
	
	// Post PurchaseItems
	@PostMapping("/purchase")
	public PurchaseItems createPurchaseItems (@RequestBody PurchaseItems purchase) {
		return purchaseRepository.save(purchase);
	}

	// get PurchaseItems by id rest api
	@GetMapping("/purchase/{id}")
	public ResponseEntity<PurchaseItems> getPurchaseItemsById(@PathVariable Long id) {
		PurchaseItems PurchaseItems = purchaseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("PurchaseItems not exist with id :" + id));
	return ResponseEntity.ok(PurchaseItems);
	}
	
	@PutMapping("/purchase/{id}")
	public ResponseEntity<PurchaseItems> updatePurchaseItems(@PathVariable Long id, @RequestBody PurchaseItems purchaseDetails){
		PurchaseItems purchase = purchaseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("PurchaseItems not exist with id :" + id));
			
		purchase.setItemCategory(purchaseDetails.getItemCategory());
		purchase.setItemName(purchaseDetails.getItemName());
		purchase.setItemCode(purchaseDetails.getItemCode());
		purchase.setPurchDate(purchaseDetails.getPurchDate());
		purchase.setUnitPrice(purchaseDetails.getUnitPrice());
		purchase.setPurchQTY(purchaseDetails.getPurchQTY());
		purchase.setPurchTotal(purchaseDetails.getPurchTotal());
		purchase.setSupName(purchaseDetails.getSupName());
		
		PurchaseItems updatedpurchase = purchaseRepository.save(purchase);
		return ResponseEntity.ok(updatedpurchase);
	}
	
	@DeleteMapping("/purchase/{id}")
	public ResponseEntity<Map<String, Boolean>> deletePurchaseItems(@PathVariable Long id){
		PurchaseItems purchase = purchaseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("PurchaseItems not exist with id :" + id));
		
		purchaseRepository.delete(purchase);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
