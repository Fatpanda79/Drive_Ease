package com.driveease.backend.repository;

import com.driveease.backend.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    // JpaRepository gives you .findAll(), .findById(), .save(), etc. automatically!
}