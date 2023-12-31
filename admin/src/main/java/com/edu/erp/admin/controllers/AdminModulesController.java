package com.edu.erp.admin.controllers;

import com.edu.erp.admin.dtos.AdminModuleDTO;
import com.edu.erp.admin.models.AdminModules;
import com.edu.erp.admin.services.AdminModulesService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@Tag(name = "Modules")
@CrossOrigin("*")
@RequestMapping("/admin")

public class AdminModulesController {
    private final AdminModulesService service;

    public AdminModulesController(AdminModulesService adminModulesService) {
        this.service = adminModulesService;
    }

    @PostMapping("/modules")
    public ResponseEntity<AdminModules> saveModule(@RequestBody @Valid AdminModuleDTO adminModuleDTO) {
        AdminModules adminModules = new AdminModules();
        BeanUtils.copyProperties(adminModuleDTO, adminModules);
        AdminModules module = service.save(adminModules);

        return (module != null) ?
                ResponseEntity.status(HttpStatus.CREATED).body(module) :
                ResponseEntity.badRequest().build();
    }

    @GetMapping("/modules")
    public ResponseEntity<Page<AdminModules>> get(Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAll(pageable));
    }

    @GetMapping("/module/{id}")
    public ResponseEntity<AdminModules> getById(@PathVariable UUID id) {
        Optional<AdminModules> modules = service.findById(id);
        return modules.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/module/{id}")
    public ResponseEntity<String> delete(@PathVariable UUID id) {
        return service.delete(id) ?
                ResponseEntity.ok("Deleted") :
                ResponseEntity.notFound().build();
    }

    @PutMapping("/module/{id}")
    public ResponseEntity<Object> update(@PathVariable UUID id, @RequestBody @Valid AdminModuleDTO dto) {
        AdminModules module = service.update(id, dto);
        return (module != null) ?
                ResponseEntity.ok(module) :
                ResponseEntity.notFound().build();
    }
}
