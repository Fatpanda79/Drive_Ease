package com.driveease.backend.controller;

import com.driveease.backend.model.AppUser;
import com.driveease.backend.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AppUserRepository userRepository;

    // SIGN UP ROUTE
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody AppUser user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already taken!");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // LOGIN ROUTE
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AppUser loginRequest) {
        Optional<AppUser> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            // In a real app, you'd return a JWT token here. For now, returning success.
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}