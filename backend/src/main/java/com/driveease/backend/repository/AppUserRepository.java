package com.driveease.backend.repository;

import com.driveease.backend.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);

    // NEW: Find all users that match a specific role (e.g., "USER")
    List<AppUser> findByRole(String role);
}