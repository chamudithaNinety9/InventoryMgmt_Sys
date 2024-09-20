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

import com.dimex.demo.model.Supplier;
import com.dimex.demo.repository.SupplierRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class SupplierController {

	@Autowired
	private SupplierRepository supplierRepository;
	
	// Get All suppliers
	@GetMapping("/supplier")
	public List<Supplier> getAllSuppliers(){
		return supplierRepository.findAll();
	}
	
	// Post Supplier
	@PostMapping("/supplier")
	public Supplier createSupplier (@RequestBody Supplier supplier) {
		return supplierRepository.save(supplier);
	}

	// get Supplier by id rest api
	@GetMapping("/supplier/{id}")
	public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
		Supplier Supplier = supplierRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Supplier not exist with id :" + id));
	return ResponseEntity.ok(Supplier);
	}
	
	@PutMapping("/supplier/{id}")
	public ResponseEntity<Supplier> updateSupplier(@PathVariable Long id, @RequestBody Supplier supplierDetails){
		Supplier supplier = supplierRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Supplier not exist with id :" + id));
		
		supplier.setSupName(supplierDetails.getSupName());
		supplier.setSupDate(supplierDetails.getSupDate());
		supplier.setSupAddress(supplierDetails.getSupAddress());
		supplier.setSupPhone(supplierDetails.getSupPhone());
		
		Supplier updatedsupplier = supplierRepository.save(supplier);
		return ResponseEntity.ok(updatedsupplier);
	}
	
	@DeleteMapping("/supplier/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteSupplier(@PathVariable Long id){
		Supplier supplier = supplierRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Supplier not exist with id :" + id));
		
		supplierRepository.delete(supplier);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
