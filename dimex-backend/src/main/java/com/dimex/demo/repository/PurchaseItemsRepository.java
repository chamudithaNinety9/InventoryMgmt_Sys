package com.dimex.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dimex.demo.model.PurchaseItems;

@Repository
public interface PurchaseItemsRepository extends JpaRepository<PurchaseItems, Long>{

}