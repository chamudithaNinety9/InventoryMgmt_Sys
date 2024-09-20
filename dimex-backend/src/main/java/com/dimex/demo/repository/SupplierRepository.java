package com.dimex.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dimex.demo.model.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long>{

}