package com.dimex.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dimex.demo.model.Selling;

@Repository
public interface SellingRepository extends JpaRepository<Selling, Long>{

}