package com.example.demo.controller;

import com.example.demo.model.Patient;
import com.example.demo.service.PatientService;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // Create patient
    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Patient createPatient(
            @RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("gender") String gender,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("bloodGroup") String bloodGroup,
            @RequestParam("disease") String disease,
            @RequestParam("emergencyContact") String emergencyContact,
            @RequestParam("status") String status,

            @RequestParam(value = "profilePhoto",
                    required = false)
            MultipartFile profilePhoto
    ) throws IOException {

        Patient patient = new Patient();

        patient.setName(name);
        patient.setAge(age);
        patient.setGender(gender);
        patient.setEmail(email);
        patient.setPhone(phone);
        patient.setAddress(address);
        patient.setBloodGroup(bloodGroup);
        patient.setDisease(disease);
        patient.setEmergencyContact(emergencyContact);
        patient.setStatus(status);

        return patientService.createPatient(
                patient,
                profilePhoto
        );
    }
    // Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Get patient by ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable String id) {
        return patientService.getPatientById(id);
    }

    // Delete patient
    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable String id) {
        patientService.deletePatient(id);
    }
    
    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Patient updatePatient(
            @PathVariable String id,

            @RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("gender") String gender,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("bloodGroup") String bloodGroup,
            @RequestParam("disease") String disease,
            @RequestParam("emergencyContact") String emergencyContact,
            @RequestParam("status") String status,

            @RequestParam(value = "profilePhoto",
                    required = false)
            MultipartFile profilePhoto
    ) throws IOException {

        Patient patient = new Patient();

        patient.setName(name);
        patient.setAge(age);
        patient.setGender(gender);
        patient.setEmail(email);
        patient.setPhone(phone);
        patient.setAddress(address);
        patient.setBloodGroup(bloodGroup);
        patient.setDisease(disease);
        patient.setEmergencyContact(emergencyContact);
        patient.setStatus(status);

        return patientService.updatePatient(
                id,
                patient,
                profilePhoto
        );
    }
}