package com.dimex.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dimex.demo.model.CreditPurchase;
import com.dimex.demo.repository.CreditPurchaseRepository;
import com.dimex.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/add/dimex/")
public class CreditPurchaseController {

    @Autowired
    private CreditPurchaseRepository creditpurchaseRepository;

    // Get All
    @GetMapping("/creditpurchase")
    public List<CreditPurchase> getAllCreditPurchases() {
        return creditpurchaseRepository.findAll();
    }

    // Post CreditPurchase
    @PostMapping("/creditpurchase")
    public CreditPurchase createCreditPurchase(@RequestBody CreditPurchase creditpurchase) {
        return creditpurchaseRepository.save(creditpurchase);
    }

    // Get CreditPurchase by id
    @GetMapping("/creditpurchase/{id}")
    public ResponseEntity<CreditPurchase> getCreditPurchaseById(@PathVariable Long id) {
        CreditPurchase creditPurchase = creditpurchaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CreditPurchase not exist with id :" + id));
        return ResponseEntity.ok(creditPurchase);
    }

    // Update CreditPurchase
    @PutMapping("/creditpurchase/{id}")
    public ResponseEntity<CreditPurchase> updateCreditPurchase(@PathVariable Long id, @RequestBody CreditPurchase creditpurchaseDetails) {
        CreditPurchase creditpurchase = creditpurchaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CreditPurchase not exist with id :" + id));

        creditpurchase.setSupName(creditpurchaseDetails.getSupName());
        creditpurchase.setPurchaseDate(creditpurchaseDetails.getPurchaseDate());
        creditpurchase.setCreditPeriod(creditpurchaseDetails.getCreditPeriod());
        creditpurchase.setEndDate(creditpurchaseDetails.getEndDate());
        creditpurchase.setCreditAmount(creditpurchaseDetails.getCreditAmount());
        creditpurchase.setCreditStatus(creditpurchaseDetails.getCreditStatus());

        CreditPurchase updatedcreditpurchase = creditpurchaseRepository.save(creditpurchase);
        return ResponseEntity.ok(updatedcreditpurchase);
    }

    // Delete CreditPurchase
    @DeleteMapping("/creditpurchase/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCreditPurchase(@PathVariable Long id) {
        CreditPurchase creditpurchase = creditpurchaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CreditPurchase not exist with id :" + id));

        creditpurchaseRepository.delete(creditpurchase);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // Update only the status of a CreditPurchase
    @PatchMapping("/creditpurchase/{id}/status")
    public ResponseEntity<CreditPurchase> updateCreditStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        CreditPurchase creditpurchase = creditpurchaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CreditPurchase not exist with id :" + id));

        String newStatus = statusMap.get("status");
        creditpurchase.setCreditStatus(newStatus);

        CreditPurchase updatedCreditPurchase = creditpurchaseRepository.save(creditpurchase);
        return ResponseEntity.ok(updatedCreditPurchase);
    }
}
