package com.dimex.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dimex.demo.model.ReturnItem;

@Repository
public interface ReturnItemRepository extends JpaRepository<ReturnItem, Long>{

}