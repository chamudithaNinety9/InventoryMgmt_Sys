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

import com.dimex.demo.model.Customer;
import com.dimex.demo.repository.CustomerRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class CustomerController {

	@Autowired
	private CustomerRepository customerRepository;
	
	// Get All customers
	@GetMapping("/customer")
	public List<Customer> getAllCustomers(){
		return customerRepository.findAll();
	}
	
	// Post customer
	@PostMapping("/customer")
	public Customer createCustomer (@RequestBody Customer customer) {
		return customerRepository.save(customer);
	}

	// get customer by id rest api
	@GetMapping("/customer/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
		Customer Customer = customerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("customer not exist with id :" + id));
	return ResponseEntity.ok(Customer);
	}
	
	@PutMapping("/customer/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails){
		Customer customer = customerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("customer not exist with id :" + id));
		
		customer.setCusName(customerDetails.getCusName());
		customer.setCusCategory(customerDetails.getCusCategory());
		customer.setCusDate(customerDetails.getCusDate());
		customer.setCusPhone(customerDetails.getCusPhone());
		
		Customer updatedcustomer = customerRepository.save(customer);
		return ResponseEntity.ok(updatedcustomer);
	}
	
	@DeleteMapping("/customer/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCustomer(@PathVariable Long id){
		Customer customer = customerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("customer not exist with id :" + id));
		
		customerRepository.delete(customer);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
