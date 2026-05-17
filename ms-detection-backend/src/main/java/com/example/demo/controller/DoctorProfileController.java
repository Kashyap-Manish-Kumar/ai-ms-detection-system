package com.example.demo.controller;

import com.example.demo.model.DoctorProfile;
import com.example.demo.service.DoctorProfileService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import org.springframework.http.MediaType;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/doctor-profile")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DoctorProfileController {

    private final DoctorProfileService
            doctorProfileService;

    // SAVE PROFILE
    @PostMapping(
            consumes =
                    MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public DoctorProfile saveDoctorProfile(

            @RequestParam("userId")
            String userId,

            @RequestParam("fullName")
            String fullName,

            @RequestParam("gender")
            String gender,

            @RequestParam("dob")
            String dob,

            @RequestParam("email")
            String email,

            @RequestParam("phone")
            String phone,

            @RequestParam("qualification")
            String qualification,

            @RequestParam("experience")
            String experience,

            @RequestParam("hospital")
            String hospital,

            @RequestParam("department")
            String department,

            @RequestParam(
                    value = "profilePhoto",
                    required = false
            )
            MultipartFile profilePhoto,

            @RequestParam(
                    value = "existingProfilePhoto",
                    required = false
            )
            String existingProfilePhoto

    ) throws IOException {

        DoctorProfile doctorProfile =
                new DoctorProfile();

        doctorProfile.setUserId(userId);

        doctorProfile.setFullName(fullName);

        doctorProfile.setGender(gender);

        doctorProfile.setDob(dob);

        doctorProfile.setEmail(email);

        doctorProfile.setPhone(phone);

        doctorProfile.setQualification(
                qualification
        );

        doctorProfile.setExperience(
                experience
        );

        doctorProfile.setHospital(
                hospital
        );

        doctorProfile.setDepartment(
                department
        );

        return doctorProfileService
                .saveDoctorProfile(
                        doctorProfile,
                        profilePhoto,
                        existingProfilePhoto
                );
    }

    // GET PROFILE BY USER ID
    @GetMapping("/{userId}")
    public DoctorProfile getDoctorProfile(
            @PathVariable String userId
    ) {

        return doctorProfileService
                .getByUserId(userId)
                .orElse(null);
    }
}