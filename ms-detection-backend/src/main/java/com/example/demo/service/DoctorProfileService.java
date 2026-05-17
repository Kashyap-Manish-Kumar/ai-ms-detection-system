package com.example.demo.service;

import com.example.demo.model.DoctorProfile;
import com.example.demo.repository.DoctorProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.UUID;

@Service
public class DoctorProfileService {

    private final DoctorProfileRepository doctorProfileRepository;

    private final String UPLOAD_DIR = "uploads/";

    public DoctorProfileService(
            DoctorProfileRepository doctorProfileRepository
    ) {
        this.doctorProfileRepository =
                doctorProfileRepository;
    }

    // CREATE OR UPDATE
    public DoctorProfile saveDoctorProfile(
            DoctorProfile doctorProfile,
            MultipartFile profilePhoto,
            String existingProfilePhoto
    ) throws IOException {

        Optional<DoctorProfile> existingProfile =
                doctorProfileRepository.findByUserId(
                        doctorProfile.getUserId()
                );

        // KEEP SAME DOCUMENT ID
        if (existingProfile.isPresent()) {

            doctorProfile.setId(
                    existingProfile.get().getId()
            );
        }

        // NEW IMAGE UPLOADED
        if (
                profilePhoto != null &&
                !profilePhoto.isEmpty()
        ) {

            String imageName =
                    saveImage(profilePhoto);

            doctorProfile.setProfilePhoto(
                    imageName
            );

        }

        // KEEP EXISTING IMAGE FROM FRONTEND
        else if (
                existingProfilePhoto != null &&
                !existingProfilePhoto.isEmpty()
        ) {

            doctorProfile.setProfilePhoto(
                    existingProfilePhoto
            );
        }

        // KEEP OLD DATABASE IMAGE
        else if (existingProfile.isPresent()) {

            doctorProfile.setProfilePhoto(
                    existingProfile
                            .get()
                            .getProfilePhoto()
            );
        }

        return doctorProfileRepository
                .save(doctorProfile);
    }

    // GET BY USER ID
    public Optional<DoctorProfile> getByUserId(
            String userId
    ) {
        return doctorProfileRepository
                .findByUserId(userId);
    }

    // SAVE IMAGE
    private String saveImage(
            MultipartFile file
    ) throws IOException {

        if (
                file == null ||
                file.isEmpty()
        ) {
            return null;
        }

        Files.createDirectories(
                Paths.get(UPLOAD_DIR)
        );

        String filename =
                UUID.randomUUID()
                        + "_"
                        + file.getOriginalFilename();

        Path filepath =
                Paths.get(
                        UPLOAD_DIR,
                        filename
                );

        Files.write(
                filepath,
                file.getBytes()
        );

        return filename;
    }
}