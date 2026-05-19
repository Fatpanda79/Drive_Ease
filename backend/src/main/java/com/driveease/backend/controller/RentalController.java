package com.driveease.backend.controller;

import com.driveease.backend.model.Rental;
import com.driveease.backend.model.Vehicle;
import com.driveease.backend.repository.RentalRepository;
import com.driveease.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    // ADMIN: Get all bookings across the whole system
    @GetMapping
    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    // USER: Get only my bookings (THIS PREVENTS THE 404 ERROR)
    @GetMapping("/customer/{customerId}")
    public List<Rental> getCustomerRentals(@PathVariable Long customerId) {
        return rentalRepository.findByCustomerId(customerId);
    }

    // USER: Create a new booking (Basic)
    @PostMapping
    public Rental createRental(@RequestBody Rental rental) {
        return rentalRepository.save(rental);
    }

    // NEW: Transactional Booking Endpoint (Saves booking + Updates Car status)
    @PostMapping("/book")
    public ResponseEntity<?> bookVehicle(@RequestBody Rental newBooking) {
        // 1. Save the new booking into the Rental table
        Rental savedRental = rentalRepository.save(newBooking);

        // 2. Find the car and update its status to "Unavailable"
        Vehicle vehicle = vehicleRepository.findById(newBooking.getVehicleId()).orElse(null);
        if (vehicle != null) {
            vehicle.setAvailabilityStatus("Unavailable");
            vehicleRepository.save(vehicle);
        }

        return ResponseEntity.ok(savedRental);
    }
}