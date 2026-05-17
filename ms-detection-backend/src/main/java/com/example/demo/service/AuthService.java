package com.example.demo.service;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        if (user.getRole() == null) {
            user.setRole(Role.ROLE_DOCTOR);
        }

        userRepository.save(user);

        return "User Registered Successfully";
    }
    
    
    public User getUserByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow();
    }

    public String login(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return jwtService.generateToken(username);
    }
}