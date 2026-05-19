package com.driveease.backend.controller;

import com.driveease.backend.model.AppUser;
import com.driveease.backend.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private AppUserRepository userRepository;

    // GET Request to fetch only the customers (Role: USER)
    @GetMapping("/customers")
    public List<AppUser> getAllCustomers() {
        return userRepository.findByRole("USER");
    }

    // PUT Request to update a user's profile
    @PutMapping("/{id}")
    public AppUser updateUserProfile(@PathVariable Long id, @RequestBody AppUser updatedUser) {
        AppUser existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update the fields that the user is allowed to change
        existingUser.setFullName(updatedUser.getFullName());
        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        existingUser.setAddress(updatedUser.getAddress());
        existingUser.setLicenseNumber(updatedUser.getLicenseNumber());

        // Save and return the fresh data
        return userRepository.save(existingUser);
    }
}