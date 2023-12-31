package com.edu.erp.admin.repositories;

import com.edu.erp.admin.models.AdminProfileAccess;
import com.edu.erp.admin.models.AdminUsers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.UUID;

public interface AdminUsersRepository extends JpaRepository<AdminUsers, UUID> {
    AdminUsers findByEmail(String email);

    Page<AdminUsers> findByDateDeletionIsNull(Pageable pageable);
}
