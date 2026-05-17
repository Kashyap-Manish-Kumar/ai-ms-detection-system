package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.AuthService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {

        String token = authService.login(
                request.get("username"),
                request.get("password")
        );

        User user = authService.getUserByUsername(
                request.get("username")
        );

        return Map.of(
                "token", token,
                "userId", user.getId(),
                "username", user.getUsername()
        );
    }
}