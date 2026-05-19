package com.driveease.backend.repository;

import com.driveease.backend.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {
    // Allows the user dashboard to fetch ONLY their specific bookings
    List<Rental> findByCustomerId(Long customerId);
}