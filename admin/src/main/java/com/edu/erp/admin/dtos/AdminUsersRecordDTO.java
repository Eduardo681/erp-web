package com.edu.erp.admin.dtos;

import com.edu.erp.admin.enums.Language;
import com.edu.erp.admin.enums.Status;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


public record AdminUsersRecordDTO(
        @NotBlank String name,
        @NotBlank @Email String email,

        @NotBlank String cpf,

        @NotNull  Language language,

        @NotNull Status status,

        Date dateCreated,

        Date dateDeletion,

        @NotNull boolean admin,

        @NotBlank String password,

        String phone
        ) {
}
