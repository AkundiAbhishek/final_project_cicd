package com.klu.controller;

import com.klu.model.User;
import com.klu.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        savedUser.setPassword(null); // Do not expose password
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail()).orElse(null);
        if (user != null && userService.checkPassword(user, loginRequest.getPassword())) {
            user.setPassword(null); // Hide password in response
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
