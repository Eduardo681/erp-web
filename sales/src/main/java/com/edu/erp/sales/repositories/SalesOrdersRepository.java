package com.edu.erp.sales.repositories;

import com.edu.erp.sales.models.SalesOrders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SalesOrdersRepository extends JpaRepository<SalesOrders, Long> {
    Page<SalesOrders> findByDateDeletionIsNull(Pageable pageable);
}
