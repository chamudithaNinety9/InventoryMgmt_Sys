package com.dimex.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dimex.demo.model.DamageItem;

@Repository
public interface DamageItemRepository extends JpaRepository<DamageItem, Long>{

}