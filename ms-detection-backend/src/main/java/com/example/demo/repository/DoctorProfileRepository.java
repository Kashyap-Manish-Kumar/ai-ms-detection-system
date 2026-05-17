package com.example.demo.repository;

import com.example.demo.model.DoctorProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DoctorProfileRepository
        extends MongoRepository<DoctorProfile, String> {

    Optional<DoctorProfile> findByUserId(String userId);
}