package com.driveease.backend.repository;

import com.driveease.backend.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    // Magic method: Spring Boot automatically writes the SQL to find by email
    Optional<AppUser> findByEmail(String email);
}