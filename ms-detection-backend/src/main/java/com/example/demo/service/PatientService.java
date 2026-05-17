package com.example.demo.service;

import com.example.demo.model.Patient;
import com.example.demo.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.UUID;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    
    private final String UPLOAD_DIR = "uploads/";

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient createPatient(
            Patient patient,
            MultipartFile profilePhoto
    ) throws IOException {

        String imageName = saveImage(profilePhoto);

        patient.setProfilePhoto(imageName);

        return patientRepository.save(patient);
    }

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by ID
    public Patient getPatientById(String id) {
        Optional<Patient> patient = patientRepository.findById(id);
        return patient.orElse(null);
    }
    
    private String saveImage(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            return null;
        }

        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String filename =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path filepath = Paths.get(UPLOAD_DIR, filename);

        Files.write(filepath, file.getBytes());

        return filename;
    }
    
    
    

    // Update patient
    public Patient updatePatient(
            String id,
            Patient updatedPatient,
            MultipartFile profilePhoto
    ) throws IOException {

        Patient patient =
                patientRepository.findById(id).orElse(null);

        if (patient != null) {

            patient.setName(updatedPatient.getName());
            patient.setAge(updatedPatient.getAge());
            patient.setGender(updatedPatient.getGender());
            patient.setEmail(updatedPatient.getEmail());
            patient.setPhone(updatedPatient.getPhone());
            patient.setAddress(updatedPatient.getAddress());
            patient.setBloodGroup(updatedPatient.getBloodGroup());
            patient.setDisease(updatedPatient.getDisease());
            patient.setEmergencyContact(updatedPatient.getEmergencyContact());
            patient.setStatus(updatedPatient.getStatus());

            if (profilePhoto != null && !profilePhoto.isEmpty()) {

                String imageName = saveImage(profilePhoto);

                patient.setProfilePhoto(imageName);
            }

            return patientRepository.save(patient);
        }

        return null;
    }

    // Delete patient
    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }
}